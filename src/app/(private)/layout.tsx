import { UserAction } from '@/enum/user'
import { getAuth } from '@/utils/auth'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import LogoutButton from './logout'

const RootLayout = async ({
  children,
}: Readonly<PropsWithChildren<Record<string, any>>>) => {
  const auth = await getAuth()
  const shouldReadUsers = auth?.actions.includes(UserAction.READ)

  return (
    <>
      <nav className="p-4 border-b flex gap-4 border-[#e5eaf2]">
        <Link href="/">Home</Link>
        <span className="flex-grow"></span>
        {shouldReadUsers && <Link href="/users">Users</Link>}
        <Link href="/">{auth?.name}</Link>
        <LogoutButton />
      </nav>
      <div className="py-6 px-4 h-[calc(100%-56px)] overflow-y-auto">
        <div className="container mx-auto">{children}</div>
      </div>
    </>
  )
}

export default RootLayout
