import { AuthContext } from '@/context/AuthContext'
import { AuthModel } from '@/interfaces'
import { useRouter } from 'next/navigation'
import { useCallback, useContext } from 'react'

const useAuth = () => {
  const { push } = useRouter()
  const { actions, setAuth, ...auth } = useContext(AuthContext)

  const checkAction = useCallback(
    (action: string) => !auth || actions?.includes(action),
    [auth, actions],
  )

  const login = useCallback(
    (newAuth: AuthModel) => {
      setAuth(newAuth)
      push('/')
    },
    [setAuth, push],
  )

  const logout = useCallback(() => {
    setAuth()
    push('/login')
  }, [setAuth, push])

  return {
    auth: { actions, ...auth },
    setAuth,
    login,
    logout,
    checkAction,
  }
}

export default useAuth
