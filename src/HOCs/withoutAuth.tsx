'use client'

import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { ComponentType, useEffect } from 'react'

function withoutAuth(Component: ComponentType) {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const auth = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (auth) router.replace('/')
    }, [auth, router])

    return <Component {...props} />
  }
}

export default withoutAuth
