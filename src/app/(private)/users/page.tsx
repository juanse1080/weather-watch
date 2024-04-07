import { getUsers } from '@/services/user'
import UsersTable from './table'

const UsersPage = async ({ searchParams }: any) => {
  // TODO: change type

  const page = searchParams.page ? +searchParams.page : 0
  const per_page = searchParams.per_page ? +searchParams.per_page : 10

  const response = await getUsers({
    page,
    per_page,
  })

  return <UsersTable {...response} />
}

export default UsersPage
