import prisma from '@/libs/prisma'
import { loginSchema } from '@/schemas/login'
import { transformZodIssues } from '@/utils/errors'
import { transformUser } from '@/utils/models'
import {
  BadRequestResponse,
  InternalErrorResponse,
  UnauthorizedRequestResponse,
  getTokenAndSetCookie,
} from '@/utils/response'
import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'

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

    return getTokenAndSetCookie(currentUser)
  } catch (error) {
    return InternalErrorResponse(error)
  }
}
