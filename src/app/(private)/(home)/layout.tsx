import { PropsWithChildren, ReactNode } from 'react'

const Layout = ({
  today,
  daily,
  hourly,
  current,
  children,
}: Readonly<
  PropsWithChildren<{
    today: ReactNode
    hourly: ReactNode
    daily: ReactNode
    current: ReactNode
  }>
>) => {
  return (
    <div className="flex gap-4 flex-col">
      {current}
      {today}
      {hourly}
      {daily}
    </div>
  )
}

export default Layout
