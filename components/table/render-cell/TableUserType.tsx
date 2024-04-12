import { getUserType } from '@/lib/utils/utils'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableUserType = ({ row }: Props) => {
  const userType = getUserType(Number(row.user_type))
  return <div className='text-center'>{userType}</div>
}

export { TableUserType }
