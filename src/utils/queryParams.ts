import { PaginationFormQueryParams, PaginationParams } from '@/interfaces'

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
