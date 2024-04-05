'use client'

import { Button, Input } from '@/components/atoms'
import useLazyFetch from '@/hooks/useLazyFetch'
import { registerSchema, registerSchemaType } from '@/schemas/register'
import { transformZodIssuesToBasicObject } from '@/utils/errors'
import { saveState } from '@/utils/localStorage'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { ZodIssue } from 'zod'

const defaultValues: Partial<registerSchemaType> = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function RegisterPage() {
  const router = useRouter()

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
    onError,
  )

  const onSubmit = async (data: registerSchemaType) => {
    const response = await fetchData({ data, method: 'POST' })
    saveState('auth', response)
    router.replace('/')
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
        helperText={errors?.password?.message}
        {...register('password')}
      />
      <Input
        required
        fulWidth
        label="Confirm password"
        error={!!errors.confirmPassword}
        helperText={errors?.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Button type="submit" loading={loading}>
        Enviar
      </Button>
    </form>
  )
}
