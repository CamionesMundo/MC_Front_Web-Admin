import { capitalize } from '@/lib/utils/utils'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableRole = ({ row }: Props) => {
  const roleName = row?.role?.name_role ?? 'Sin rol'
  return <div className='text-center'>{capitalize(roleName as string)}</div>
}

export default TableRole
