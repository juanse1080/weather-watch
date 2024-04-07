import { PaginationParams, PaginationType, UserModel } from '@/interfaces'
import prisma from '@/libs/prisma'
import { transformUser } from '../utils/models'

export const getUsers = async ({ page, per_page }: PaginationParams) => {
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

  const response: PaginationType<UserModel> = {
    data: data.map((user) => transformUser(user)),
    metadata: {
      page,
      per_page,
      count,
    },
  }

  return response
}

export const getUser = (id: number) => {
  return prisma.user.findFirst({
    include: {
      roles: {
        select: {
          code: true,
          actions: true,
        },
      },
    },
    where: {
      id,
    },
  })
}
