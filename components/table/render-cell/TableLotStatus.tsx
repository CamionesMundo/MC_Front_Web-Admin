import { LotStatus } from '@/types/enums'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableLotStatus = ({ row }: Props) => {
  return (
    <div>
      {row.status === LotStatus.Active && (
        <span className='text-black dark:text-white'>Activo</span>
      )}
      {row.status === LotStatus.InProgress && (
        <span className='text-black dark:text-white'>En progreso</span>
      )}
      {row.status === LotStatus.Finished && (
        <span className='text-black dark:text-white'>Finalizado</span>
      )}
    </div>
  )
}

export { TableLotStatus }
