'use client'

import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { ComponentType, useEffect } from 'react'

function withAuth(Component: ComponentType, action?: string) {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const { auth, checkAction } = useAuth()
    const router = useRouter()

    //TODO: add loading component

    useEffect(() => {
      if (!auth) router.replace('/login')
      if (auth && action && !checkAction(action)) router.back()
    }, [auth, router, checkAction])

    return <Component {...props} />
  }
}

export default withAuth
