'use client'

import { Button, Input } from '@/components/atoms'
import useAuth from '@/hooks/useAuth'
import useLazyFetch from '@/hooks/useLazyFetch'
import { loginSchema, loginSchemaType } from '@/schemas/login'
import { transformZodIssuesToBasicObject } from '@/utils/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ZodIssue } from 'zod'

const defaultValues: Partial<loginSchemaType> = {
  email: '',
  password: '',
}

export default function LoginPage() {
  const { login } = useAuth()
  const [apiError, setApiError] = useState<string>()

  const onError = (
    error: AxiosError<{
      errors: Partial<Record<keyof loginSchemaType, ZodIssue[]>>
      message: string
    }>,
  ) => {
    if (error.response?.status === 400 && error.response?.data?.errors) {
      const errors = transformZodIssuesToBasicObject<loginSchemaType>(
        error.response?.data?.errors,
      )

      Object.entries(errors).forEach(([field, error]) => {
        setError(field as keyof loginSchemaType, error)
      })
    }

    if (error.response?.status === 401)
      setApiError(error.response?.data?.message)
  }

  const { fetchData, loading } = useLazyFetch<any, loginSchemaType>()

  const onSubmit = async (data: loginSchemaType) => {
    try {
      const response = await fetchData('login', { data, method: 'POST' })
      setApiError(undefined)
      login(response)
    } catch (error: any) {
      onError(error)
    }
  }

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  })

  return (
    <>
      {apiError && (
        <div className="bg-red-50 w-full p-3 rounded-md">{apiError}</div>
      )}
      <form
        className="flex flex-col items-center gap-4 p-4 "
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Input
          required
          fulWidth
          label="Email"
          error={!!errors.email}
          helperText={errors?.email?.message}
          {...register('email')}
        />
        <Input
          required
          fulWidth
          label="Password"
          error={!!errors.password}
          type="password"
          helperText={errors?.password?.message}
          {...register('password')}
        />
        <span className="text-sm">
          ¿Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="underline decoration-1 text-blue-500"
          >
            Create one
          </Link>
        </span>
        <Button type="submit" loading={loading}>
          Login
        </Button>
      </form>
    </>
  )
}
