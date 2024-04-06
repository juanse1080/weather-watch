import { UserAction } from '@/enum/user'
import { Pagination, UserModel } from '@/interfaces'
import prisma from '@/libs/prisma'
import { checkAuth } from '@/utils/auth'
import { transformUser } from '@/utils/models'
import { getPaginationParams } from '@/utils/request'
import {
  ForbiddenRequestResponse,
  InternalErrorResponse,
  UnauthorizedRequestResponse,
} from '@/utils/response'
import { AuthenticatedRequest, NextResponse } from 'next/server'

export async function GET(request: AuthenticatedRequest) {
  try {
    const { session, permission } = await checkAuth(UserAction.READ)
    if (!session) return UnauthorizedRequestResponse()
    if (!permission) return ForbiddenRequestResponse()

    const { page, per_page } = getPaginationParams(request.nextUrl.searchParams)

    const data = await prisma.user.findMany({
      include: {
        roles: {
          select: {
            code: true,
            actions: true,
          },
        },
      },
      skip: page * per_page,
      take: per_page,
    })

    const count = await prisma.user.count()

    const response: Pagination<UserModel> = {
      data: data.map((user) => transformUser(user)),
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
