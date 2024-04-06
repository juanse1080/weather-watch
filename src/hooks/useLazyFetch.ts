import axios, { AxiosRequestConfig } from 'axios'
import { useCallback, useState } from 'react'

const useLazyFetch = <
  TResponse extends Record<string, unknown>,
  TData extends Record<string, unknown> | undefined = undefined,
>() => {
  const [response, setResponse] = useState<TResponse>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>()

  const fetchData = useCallback(
    async (url: string, options: AxiosRequestConfig<TData>) => {
      try {
        setLoading(true)
        const response = await axios(url, {
          baseURL: 'http://localhost:3000/api', // TODO: add env
          ...options,
        })

        setResponse(response.data as TResponse)
        setLoading(false)

        return response.data as TResponse
      } catch (error) {
        setError(error)
        setLoading(false)

        throw error
      }
    },
    [],
  )

  return {
    response,
    loading,
    error,
    fetchData,
    setResponse,
  }
}

export default useLazyFetch
