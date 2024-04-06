'use client'

import { Cell, Pagination, Table, genericItem } from '@/components/molecules'
import useLazyFetch from '@/hooks/useLazyFetch'
import { PaginationType, UserModel } from '@/interfaces'
import { merge } from '@/utils/merge-clsx'
import { useCallback, useMemo, useState } from 'react'

type getCellsType<T extends genericItem> = (
  onDelete: (item: T) => (e: unknown) => void,
  loading?: number,
) => Cell<T>[]

const getCells: getCellsType<UserModel> = (onDelete, loading) => [
  {
    label: 'Name',
    field: 'name',
  },
  {
    label: 'Role',
    field: 'roles',
  },
  {
    label: 'Email',
    field: 'email',
  },
  {
    label: 'Actions',
    renderCell: (item) => (
      <button
        className={merge('text-red-500', {
          'cursor-not-allowed opacity-50': item.roles.includes('admin'),
        })}
        onClick={onDelete(item)}
        disabled={item.roles.includes('admin')}
      >
        {loading === item.id ? (
          <svg
            className="animate-spin -ml-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            viewBox="0 -960 960 960"
            width="16"
            fill="currentColor"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        )}
      </button>
    ),
  },
]

export interface UsersTableProps extends PaginationType<UserModel> {}

const UsersTable = ({ data, metadata }: UsersTableProps) => {
  const { fetchData } = useLazyFetch()
  const [items, setItems] = useState(data)
  const [loading, setLoading] = useState<number>()

  const onDelete = useCallback(
    (item: UserModel) => async () => {
      setLoading(item.id)
      await fetchData(`/users/${item.id}`, { method: 'DELETE' })
      setItems((before) => {
        const index = before.findIndex((i) => i.id === item.id)
        return [...before.slice(0, index), ...before.slice(index + 1)]
      })
      setLoading(undefined)
    },
    [fetchData],
  )

  const cells = useMemo(() => getCells(onDelete, loading), [loading, onDelete])

  return (
    <>
      <h1 className="text-3xl mb-4">List of users</h1>
      <Table cells={cells} items={items} />
      <Pagination url="/users" {...metadata} />
    </>
  )
}

export default UsersTable
