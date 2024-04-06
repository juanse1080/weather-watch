import { AuthModel, RolePrisma, UserModel, UserPrisma } from '@/interfaces'
import prisma from '@/libs/prisma'

import jwt from 'jsonwebtoken'
import { AuthenticatedRequest, NextRequest } from 'next/server'
import { getCookie } from './request'

export const rolesToActions = (roles: RolePrisma[]) => {
  const getActions = (role: RolePrisma) =>
    role.actions.map((action) => action.code)

  const actions: string[] = []
  roles.forEach((role) => actions.push(...getActions(role)))

  return actions
}

export const transformUser = (user: UserPrisma) => {
  const { password, roles, ...currentUser } = user

  const transformUser: UserModel = {
    ...currentUser,
    actions: rolesToActions(roles),
    roles: roles.map((role) => role.code),
  }

  return transformUser
}

export const getAuth = (request: NextRequest) => {
  const token = getCookie(request.cookies, 'token')
  if (!token) return

  const decodedToken = jwt.decode(token, {
    complete: true,
  })

  return decodedToken?.payload as AuthModel
}

export const checkAuth = async (
  request: AuthenticatedRequest,
  action?: string,
) => {
  const sessionError = {
    session: false,
    permission: false,
  }

  const auth = getAuth(request)
  if (!auth) return sessionError

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
      id: +auth.id,
    },
  })

  if (!data) return sessionError

  request.auth = auth
  return {
    session: true,
    permission: !action || auth.actions.includes(action),
  }
}
