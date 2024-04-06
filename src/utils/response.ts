import { UserModel } from '@/interfaces'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export const NotFoundResponse = (message: string = 'Not found') =>
  NextResponse.json({ message }, { status: 404 })

export const InternalErrorResponse = (
  error: unknown,
  message: string = 'Internal error',
) => NextResponse.json({ message, error }, { status: 500 })

export const BadRequestResponse = (
  errors?: unknown,
  message: string = 'Bad request',
) => NextResponse.json({ message, errors }, { status: 400 })

export const UnauthorizedRequestResponse = (message: string = 'Unauthorized') =>
  NextResponse.json({ message }, { status: 401 })

export const ForbiddenRequestResponse = (message: string = 'Forbidden') =>
  NextResponse.json({ message }, { status: 403 })

const generateToken = (user: UserModel) =>
  jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: +process.env.EXPIRED_TOKEN,
  })

export const getTokenAndSetCookie = (user: UserModel) => {
  const token = generateToken(user)
  const response = NextResponse.json(
    { ...user, token },
    {
      status: 200,
    },
  )
  response.cookies.set('token', token, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: +process.env.EXPIRED_TOKEN,
    path: '/',
  })

  response.cookies.set('auth', JSON.stringify(user), {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: +process.env.EXPIRED_TOKEN,
    path: '/',
  })

  return response
}
