'use client'

import { Button, Input } from '@/components/atoms'
import useAuth from '@/hooks/useAuth'
import useLazyFetch from '@/hooks/useLazyFetch'
import { registerSchema, registerSchemaType } from '@/schemas/register'
import { transformZodIssuesToBasicObject } from '@/utils/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { ZodIssue } from 'zod'

const defaultValues: Partial<registerSchemaType> = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function RegisterPage() {
  const { login } = useAuth()

  const onError = (
    error: AxiosError<{
      errors: Partial<Record<keyof registerSchemaType, ZodIssue[]>>
      message: string
    }>,
  ) => {
    if (error.response?.status === 400 && error.response?.data?.errors) {
      const errors = transformZodIssuesToBasicObject<registerSchemaType>(
        error.response?.data?.errors,
      )

      Object.entries(errors).forEach(([field, error]) => {
        setError(field as keyof registerSchemaType, error)
      })
    }
  }

  const { fetchData, loading } = useLazyFetch<any, registerSchemaType>(
    'register',
  )

  const onSubmit = async (data: registerSchemaType) => {
    try {
      const response = await fetchData({ data, method: 'POST' })
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
  } = useForm<registerSchemaType>({
    defaultValues,
    resolver: zodResolver(registerSchema),
  })

  return (
    <form
      className="flex flex-col items-end gap-4 p-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Input
        required
        fulWidth
        label="Name"
        error={!!errors.name}
        helperText={errors?.name?.message}
        {...register('name')}
      />
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
      <Input
        required
        fulWidth
        label="Confirm password"
        error={!!errors.confirmPassword}
        type="password"
        helperText={errors?.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Button type="submit" loading={loading}>
        Enviar
      </Button>
    </form>
  )
}