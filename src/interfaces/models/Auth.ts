import { UserModel } from './User'

export interface AuthModel extends UserModel {
  token: string
}

export interface AuthContextType extends AuthModel {
  setAuth: (auth?: AuthModel) => void
}
