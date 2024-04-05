import prisma from '@/libs/prisma'
import { loginSchema } from '@/schemas/login'
import { transformZodIssues } from '@/utils/errors'
import { transformUser } from '@/utils/models'
import {
  BadRequestResponse,
  InternalErrorResponse,
  UnauthorizedRequestResponse,
} from '@/utils/response'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const valid = loginSchema.safeParse(body)
    if (!valid.success)
      return BadRequestResponse(transformZodIssues(valid.error.errors))

    const { email, password } = body
    const data = await prisma.user.findFirst({
      include: {
        roles: {
          select: {
            code: true,
            actions: true,
          },
        },
      },
      where: {
        email,
      },
    })
    if (!data) return UnauthorizedRequestResponse()

    const isCorrect: boolean = await bcrypt.compare(password, data.password)
    if (!isCorrect) return UnauthorizedRequestResponse()

    const currentUser = transformUser(data)

    const token = jwt.sign({ data: currentUser }, process.env.SECRET_KEY, {
      expiresIn: +process.env.EXPIRED_TOKEN,
    })

    const response = NextResponse.json(
      { ...currentUser, token },
      { status: 200 },
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
