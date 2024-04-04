import prisma from '@/libs/prisma'
import { transformUser } from '@/utils/models'
import { BadRequestResponse, InternalErrorResponse } from '@/utils/response'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const schema = z
      .object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        confirmPassword: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
      })
    const valid = schema.safeParse(body)
    if (!valid.success) return BadRequestResponse(valid.error.errors)

    const { name, email, password } = body
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })
    if (user) return BadRequestResponse(undefined, 'User already exists')

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = transformUser(
      await prisma.user.create({
        include: {
          roles: {
            select: {
              code: true,
              actions: true,
            },
          },
        },
        data: {
          name,
          email,
          password: hashedPassword,
          roles: {
            connect: {
              code: 'user',
            },
          },
        },
      }),
    )

    const token = jwt.sign({ data: newUser }, process.env.SECRET_KEY, {
      expiresIn: +process.env.EXPIRED_TOKEN,
    })

    const response = NextResponse.json(
      { ...newUser, token },
      {
        status: 200,
      },
    )

    response.cookies.set('auth_cookie', token, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: +process.env.EXPIRED_TOKEN,
      path: '/',
    })

    return response
  } catch (error) {
    return InternalErrorResponse(error)
  }
}
