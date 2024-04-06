'use client'

import { AuthContextType, AuthModel, UserModel } from '@/interfaces'
import { loadState, saveState } from '@/utils/localStorage'
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react'

export const AuthContext = createContext({} as AuthContextType)

export default function AuthProvider({
  children,
}: Readonly<PropsWithChildren<{}>>) {
  const localAuth = loadState<UserModel>('auth')
  const localToken = loadState<string>('token')

  const [auth, setAuth] = useState<AuthModel>({
    token: localToken as string,
    ...(localAuth as UserModel),
  })

  const handleAuth = useCallback((newAuth?: AuthModel) => {
    setAuth(newAuth as AuthModel)

    saveState('auth', newAuth, true)
    saveState('token', newAuth?.token, true)
  }, [])

  const authValue = useMemo(
    () => ({ setAuth: handleAuth, ...auth }),
    [auth, handleAuth],
  )

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
}
