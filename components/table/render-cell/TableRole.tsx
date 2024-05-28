import { capitalize } from '@/lib/utils/utils'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableRole = ({ row }: Props) => {
  const isRoleAdmin = row?.role !== undefined
  if (isRoleAdmin) {
    const roleName = row?.role?.name_role ?? 'Sin rol'
    return (
      <div className='text-center dark:text-white'>
        {capitalize(roleName as string)}
      </div>
    )
  } else {
    const roleName = row?.name_role ?? 'Sin rol'
    return (
      <div className='text-center dark:text-white'>
        {capitalize(roleName as string)}
      </div>
    )
  }
}

export default TableRole
