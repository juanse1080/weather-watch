import { RoleAction } from '@/enum/role'
import { ParamsRequest } from '@/interfaces'
import prisma from '@/libs/prisma'
import { checkAuth } from '@/utils/auth'
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
    const { session, permission } = await checkAuth(RoleAction.READ)
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
  _request: NextRequest,
  { params }: ParamsRequest<{ id: string }>,
) {
  try {
    const { session, permission } = await checkAuth(RoleAction.DELETE)
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
