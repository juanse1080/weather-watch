import prisma from '@/libs/prisma'
import { registerSchema } from '@/schemas/register'
import { transformZodIssues } from '@/utils/errors'
import { transformUser } from '@/utils/models'
import { BadRequestResponse, InternalErrorResponse } from '@/utils/response'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const valid = registerSchema.safeParse(body)
    if (!valid.success)
      return BadRequestResponse(transformZodIssues(valid.error.errors))

    const { name, email, password } = body
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })
    if (user)
      return BadRequestResponse(
        transformZodIssues([
          {
            message: 'User already exists',
            path: ['email'],
            type: 'custom',
          },
        ]),
        'User already exists',
      )

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
