import { AuthModel } from '@/interfaces'
import { cookies } from 'next/headers'

import { getUser } from '@/services/user'
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

export const validateAuth = async () => {
  const auth = await getAuth()
  if (!auth) return

  const data = await getUser(auth.id)
  if (!data) return

  return data
}

export const checkAuth = async (action?: string) => {
  const sessionError = {
    session: false,
    permission: false,
    auth: undefined,
  }

  const auth = await validateAuth()
  if (!auth) return sessionError

  const user = transformUser(auth)

  return {
    auth,
    session: true,
    permission: !action || user.actions.includes(action),
  }
}
