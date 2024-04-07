'use client'

import { PaginationLoading, TableLoading } from '@/components/molecules'
import { getCells } from './const'

const Loading = () => {
  return (
    <>
      <TableLoading cells={getCells()} />
      <PaginationLoading />
    </>
  )
}

export default Loading
