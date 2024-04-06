import { PropsWithChildren } from 'react'

function LoginLayout({
  children,
}: Readonly<PropsWithChildren<Record<string, any>>>) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-1/2 rounded-md border h-min p-3">{children}</div>
    </div>
  )
}

export default LoginLayout
