import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}
const TableConfirmationUser = ({ row }: Props) => {
  return <div className='dark:text-white'>{row.userAdmin !== null ? row.userAdmin?.name_user : 'N/D'}</div>
}

export { TableConfirmationUser }