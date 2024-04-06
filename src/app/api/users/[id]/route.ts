import { UserAction } from '@/enum/user'
import { ParamsRequest } from '@/interfaces'
import prisma from '@/libs/prisma'
import { checkAuth, transformUser } from '@/utils/models'
import {
  ForbiddenRequestResponse,
  InternalErrorResponse,
  NotFoundResponse,
  UnauthorizedRequestResponse,
} from '@/utils/response'
import { AuthenticatedRequest, NextResponse } from 'next/server'

export async function GET(
  request: AuthenticatedRequest,
  { params }: ParamsRequest<{ id: string }>,
) {
  try {
    const { session, permission } = await checkAuth(request, UserAction.READ)
    if (!session) return UnauthorizedRequestResponse()
    if (!permission) return ForbiddenRequestResponse()

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
        id: +params.id,
      },
    })

    if (!data) return NotFoundResponse('User not found')

    return NextResponse.json(transformUser(data), { status: 200 })
  } catch (error) {
    return InternalErrorResponse(error)
  }
}

export async function DELETE(
  request: AuthenticatedRequest,
  { params }: ParamsRequest<{ id: string }>,
) {
  try {
    const { session, permission } = await checkAuth(request, UserAction.DELETE)
    if (!session) return UnauthorizedRequestResponse()
    if (!permission) return ForbiddenRequestResponse()

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
        id: +params.id,
      },
    })

    if (!data) return NotFoundResponse('User not found')

    await prisma.user.delete({
      where: {
        id: data.id,
      },
    })

    return NextResponse.json(transformUser(data), { status: 200 })
  } catch (error) {
    return InternalErrorResponse(error)
  }
}
