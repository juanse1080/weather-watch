import { NextRequest } from 'next/server'

declare module 'next/server' {
  interface AuthenticatedRequest extends NextRequest {
    auth: AuthModel
  }
}
