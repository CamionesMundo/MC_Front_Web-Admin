import { isSameDate } from '@/lib/utils/utils'
import { LotStatus } from '@/types/enums'
import { Button } from '@nextui-org/react'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}
const TableLotTransmission = ({ row }: Props) => {
  const isInprogress = row.status === LotStatus.InProgress
  const isDisabled =
    row.status === LotStatus.Active &&
    !isSameDate(row.transmission_date as string)
  const isEnabled =
    row.status === LotStatus.Active &&
    isSameDate(row.transmission_date as string)
  return (
    <div>
      {isInprogress && <Button color='success'>En progreso</Button>}
      {isDisabled && (
        <Button
          color='default'
          disabled
          className='hover:cursor-not-allowed bg-gray-400/80'
        >
          Transmisión
        </Button>
      )}
      {isEnabled && <Button color='primary'>Transmisión</Button>}
    </div>
  )
}

export { TableLotTransmission }
