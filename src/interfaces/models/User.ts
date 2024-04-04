import { User } from '@prisma/client'
import { RolePrisma } from './Role'

export interface UserPrisma extends User {
  roles: RolePrisma[]
}

export interface UserModel extends Omit<User, 'password'> {
  actions: string[]
  roles: string[]
}
