import { getAuth } from '@/utils/auth'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { UserAction } from './enum/user'

export async function middleware(request: NextRequest) {
  try {
    const auth = await getAuth()
    const pathname = request.nextUrl.pathname
    const publicPaths = ['/login', '/register']

    if (auth && publicPaths.includes(pathname))
      return NextResponse.redirect(new URL('/', request.url))
    if (!auth && !publicPaths.includes(pathname))
      return NextResponse.redirect(new URL('/login', request.url))
    if (pathname === '/users' && !auth?.actions.includes(UserAction.READ))
      return NextResponse.redirect(new URL('/', request.url))

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: [`/((?!api|_next/static|_next/image|favicon.ico).*)`],
}
