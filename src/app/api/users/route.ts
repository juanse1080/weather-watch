import { UserAction } from '@/enum/user'
import { getUsers } from '@/services/user'
import { checkAuth } from '@/utils/auth'
import { getPaginationParams } from '@/utils/request'
import {
  ForbiddenRequestResponse,
  InternalErrorResponse,
  UnauthorizedRequestResponse,
} from '@/utils/response'
import { AuthenticatedRequest, NextResponse } from 'next/server'

export async function GET(request: AuthenticatedRequest) {
  try {
    const { session, permission } = await checkAuth(UserAction.READ)
    if (!session) return UnauthorizedRequestResponse()
    if (!permission) return ForbiddenRequestResponse()

    const params = getPaginationParams(request.nextUrl.searchParams)
    const response = await getUsers(params)

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return InternalErrorResponse(error)
  }
}
