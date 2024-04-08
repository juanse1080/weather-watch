'use client'
import { Button, ButtonProps } from '@/components/atoms'
import { useRouter } from 'next/navigation'

export interface ButtonRedirectProps extends ButtonProps {
  path: string
}
function ButtonRedirect({
  path,
  children,
  ...props
}: Readonly<ButtonRedirectProps>) {
  const { push } = useRouter()

  return (
    <Button {...props} onClick={() => push(path)}>
      {children}
    </Button>
  )
}

export default ButtonRedirect
