import { type ClientDataType } from '@/types/api/response/user'
import { Switch, Tooltip } from '@nextui-org/react'
import React, { useState } from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
  onChangeStatusRow?: (row: ClientDataType) => void
}

const TableIsActive = ({ row, onChangeStatusRow }: Props) => {
  const [isSelected, setIsSelected] = useState<boolean>(row?.active as boolean)

  const handleChangeSwitch = () => {
    setIsSelected(!isSelected)
    if (onChangeStatusRow !== undefined) {
      onChangeStatusRow(row as ClientDataType)
    }
  }
  return (
    <Tooltip content='Activar/Desactivar' color='foreground'>
      <div className='flex justify-center'>
        <Switch
          size='sm'
          isSelected={isSelected}
          onValueChange={handleChangeSwitch}
          color='primary'
        />
      </div>
    </Tooltip>
  )
}

export { TableIsActive }
