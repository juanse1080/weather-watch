import { Pagination, UserModel } from '@/interfaces'
import prisma from '@/libs/prisma'
import { transformUser } from '@/utils/models'
import { getPaginationParams } from '@/utils/queryParams'
import { InternalErrorResponse } from '@/utils/response'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
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
