import { ErrorOption } from 'react-hook-form'
import { ZodIssue } from 'zod'

type CustomZodIssue = {
  path: (string | number)[]
  message: string
  type?: string
} & Partial<ZodIssue>

export const transformZodIssues = <TData extends Record<string, unknown>>(
  issues: CustomZodIssue[],
) => {
  return issues.reduce(
    (acc, issue) => {
      const field = issue.path[0] as keyof TData

      if (field in acc) acc[field].push(issue)
      else acc[field] = [issue]

      return acc
    },
    {} as Record<keyof TData, CustomZodIssue[]>,
  ) as Partial<Record<keyof TData, CustomZodIssue[]>>
}

export const transformZodIssuesToBasicObject = <
  TData extends Record<string, unknown>,
>(
  errors?: Partial<Record<keyof TData, CustomZodIssue[]>>,
) => {
  if (!errors) return {} as Partial<Record<keyof TData, ErrorOption>>

  return Object.entries(errors).reduce((acc, [field, issue]) => {
    const currentIssue = issue as CustomZodIssue[]
    return {
      ...acc,
      [field]: {
        message: currentIssue[0].message,
        type: currentIssue[0].type ?? 'custom',
      },
    }
  }, {}) as Partial<Record<keyof TData, ErrorOption>>
}
