import { AxiosRequestConfig } from 'axios'
import { useEffect } from 'react'
import useLazyFetch from './useLazyFetch'

const useFetch = <
  TResponse extends Record<string, unknown>,
  TData extends Record<string, unknown> | undefined = undefined,
>(
  url: string,
  options: AxiosRequestConfig<TData>,
) => {
  const { fetchData, ...rest } = useLazyFetch<TResponse, TData>(url)

  useEffect(() => {
    fetchData(options)
  }, [fetchData, options])

  return { ...rest, fetchData }
}

export default useFetch
