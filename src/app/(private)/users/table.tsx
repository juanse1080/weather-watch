'use client'

import { Pagination, Table } from '@/components/molecules'
import useLazyFetch from '@/hooks/useLazyFetch'
import { PaginationType, UserModel } from '@/interfaces'
import { useCallback, useMemo, useState } from 'react'
import { getCells } from './const'

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

  const cells = useMemo(() => getCells(loading, onDelete), [loading, onDelete])

  return (
    <>
      <Table cells={cells} items={items} />
      <Pagination url="/users" {...metadata} />
    </>
  )
}

export default UsersTable
