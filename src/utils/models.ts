'use server'

import { RolePrisma, UserModel, UserPrisma } from '@/interfaces'

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
