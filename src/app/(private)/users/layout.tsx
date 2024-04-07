import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <h1 className="text-3xl mb-4">List of users</h1>
      {children}
    </>
  )
}

export default Layout
