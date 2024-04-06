import prisma from '@/libs/prisma'
import { registerSchema } from '@/schemas/register'
import { transformZodIssues } from '@/utils/errors'
import { transformUser } from '@/utils/models'
import {
  BadRequestResponse,
  InternalErrorResponse,
  getTokenAndSetCookie,
} from '@/utils/response'
import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'

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

    return getTokenAndSetCookie(newUser)
  } catch (error) {
    return InternalErrorResponse(error)
  }
}
