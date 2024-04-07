import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return <div className="bg-white flex gap-4 flex-col">{children}</div>
}

export default Layout
