import { PropsWithChildren } from 'react'

function LoginLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="lg:w-100 md:w-1/2 sm:w-5/6 w-full rounded-md border h-min p-3">
        {children}
      </div>
    </div>
  )
}

export default LoginLayout
