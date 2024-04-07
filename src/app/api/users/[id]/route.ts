import { UserAction } from '@/enum/user'
import { ParamsRequest } from '@/interfaces'
import prisma from '@/libs/prisma'
import { getUser } from '@/services/user'
import { checkAuth } from '@/utils/auth'
import { transformUser } from '@/utils/models'
import {
  ForbiddenRequestResponse,
  InternalErrorResponse,
  NotFoundResponse,
  UnauthorizedRequestResponse,
} from '@/utils/response'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params }: ParamsRequest<{ id: string }>,
) {
  try {
    const { session, permission } = await checkAuth(UserAction.READ)
    if (!session) return UnauthorizedRequestResponse()
    if (!permission) return ForbiddenRequestResponse()

    const data = await getUser(+params.id)
    if (!data) return NotFoundResponse('User not found')

    return NextResponse.json(transformUser(data), { status: 200 })
  } catch (error) {
    return InternalErrorResponse(error)
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: ParamsRequest<{ id: string }>,
) {
  try {
    const { session, permission } = await checkAuth(UserAction.DELETE)
    if (!session) return UnauthorizedRequestResponse()
    if (!permission) return ForbiddenRequestResponse()

    const data = await getUser(+params.id)
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
