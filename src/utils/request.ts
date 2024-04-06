import { PaginationFormQueryParams, PaginationParams } from '@/interfaces'
import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies'

export const queryParams = <T extends Record<string, any>>(
  urlParams: URLSearchParams,
) => {
  return Object.fromEntries(urlParams) as T
}

export const getPaginationParams = (
  urlParams: URLSearchParams,
): PaginationParams => {
  const currentQueryParams = queryParams<PaginationFormQueryParams>(urlParams)
  const toInt = (value?: string) => (value ? parseInt(value) : undefined)

  return {
    page: toInt(currentQueryParams.page) ?? 0,
    per_page: toInt(currentQueryParams.per_page) ?? 10,
  }
}

export const objToQueryParams = (params: Record<string, any>) => {
  const searchParams = new URLSearchParams()
  Object.keys(params).forEach((key) => searchParams.append(key, params[key]))
  return searchParams.toString()
}

export const getCookie = (cookies: RequestCookies, key: string) => {
  return cookies.get(key)?.value
}
