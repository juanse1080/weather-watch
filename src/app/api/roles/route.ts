import { RoleAction } from '@/enum/role'
import { Pagination } from '@/interfaces'
import prisma from '@/libs/prisma'
import { checkAuth } from '@/utils/auth'
import { getPaginationParams } from '@/utils/request'
import {
  ForbiddenRequestResponse,
  InternalErrorResponse,
  UnauthorizedRequestResponse,
} from '@/utils/response'
import { Role } from '@prisma/client'
import { AuthenticatedRequest, NextResponse } from 'next/server'

export async function GET(request: AuthenticatedRequest) {
  try {
    const { session, permission } = await checkAuth(RoleAction.READ)
    if (!session) return UnauthorizedRequestResponse()
    if (!permission) return ForbiddenRequestResponse()

    const { page, per_page } = getPaginationParams(request.nextUrl.searchParams)

    const data = await prisma.role.findMany({
      skip: page * per_page,
      take: per_page,
    })
    const count = await prisma.role.count()

    const response: Pagination<Role> = {
      data,
      metadata: {
        page,
        per_page,
        count,
      },
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return InternalErrorResponse(error)
  }
}
