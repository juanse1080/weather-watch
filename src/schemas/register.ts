import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().min(1).email(),
    password: z.string().min(1),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type registerSchemaType = z.infer<typeof registerSchema>
