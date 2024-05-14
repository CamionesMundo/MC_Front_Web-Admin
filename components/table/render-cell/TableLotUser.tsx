import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableLotUser = ({ row }: Props) => {
  return <div>{row?.user_actionner?.name_user}</div>
}

export { TableLotUser }
