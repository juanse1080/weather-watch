'use server'

import { AuthModel } from '@/interfaces'
import prisma from '@/libs/prisma'
import { cookies } from 'next/headers'

import jwt from 'jsonwebtoken'
import { transformUser } from './models'
import { getCookie } from './request'

export const getAuth = async () => {
  const token = getCookie(cookies(), 'token')
  if (!token) return

  const decodedToken = jwt.decode(token, {
    complete: true,
  })

  return decodedToken?.payload as AuthModel
}

export const checkAuth = async (action?: string) => {
  const sessionError = {
    session: false,
    permission: false,
    auth: undefined,
  }

  const auth = await getAuth()
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

  const user = transformUser(data)

  return {
    auth,
    session: true,
    permission: !action || user.actions.includes(action),
  }
}
