import { RoleAction } from '@/enum/role'
import { ParamsRequest } from '@/interfaces'
import prisma from '@/libs/prisma'
import { checkAuth } from '@/utils/models'
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
    const { session, permission } = await checkAuth(request, RoleAction.READ)
    if (!session) return UnauthorizedRequestResponse()
    if (!permission) return ForbiddenRequestResponse()

    const data = await prisma.role.findFirst({
      where: {
        id: +params.id,
      },
    })

    if (!data)
      return NextResponse.json({ message: 'Not found role' }, { status: 404 })

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}

export async function DELETE(
  request: AuthenticatedRequest,
  { params }: ParamsRequest<{ id: string }>,
) {
  try {
    const { session, permission } = await checkAuth(request, RoleAction.DELETE)
    if (!session) return UnauthorizedRequestResponse()
    if (!permission) return ForbiddenRequestResponse()

    const data = await prisma.role.findFirst({
      where: {
        id: +params.id,
      },
    })

    if (!data) return NotFoundResponse('Role not found')

    await prisma.role.delete({
      where: {
        id: data.id,
      },
    })

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return InternalErrorResponse(error)
  }
}
