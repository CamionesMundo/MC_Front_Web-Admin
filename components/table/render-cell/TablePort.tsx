import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}
const TablePort = ({ row }: Props) => {
  return (
    <div className='text-center dark:text-white'>
      {row?.receiving_port.name !== null ? row?.receiving_port.name : 'Puerto no registrado'}
    </div>
  )
}

export { TablePort }
