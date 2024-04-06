import AuthProvider from '@/context/AuthContext'
import { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Generated by create next app',
}

function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen w-screen	max-w-screen max-h-screen bg-white overflow-hidden">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
