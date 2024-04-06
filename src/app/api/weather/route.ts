import { WeatherParams, getWeather } from '@/utils/getWeather'
import { checkAuth } from '@/utils/models'
import { queryParams } from '@/utils/request'
import {
  InternalErrorResponse,
  UnauthorizedRequestResponse,
} from '@/utils/response'
import { AuthenticatedRequest, NextResponse } from 'next/server'

export async function GET(request: AuthenticatedRequest) {
  try {
    const { session } = await checkAuth(request)
    if (!session) return UnauthorizedRequestResponse()

    const params = queryParams<WeatherParams>(request.nextUrl.searchParams)

    const response = await getWeather(params)

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return InternalErrorResponse(error)
  }
}
