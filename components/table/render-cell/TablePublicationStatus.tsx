import { type GeneralPublicationDataType } from '@/types/api/response/publication'
import { Switch, Tooltip } from '@nextui-org/react'
import React, { useState } from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
  onChangePublicationStatus?: (row: GeneralPublicationDataType) => void
}

const TablePublicationStatus = ({ row, onChangePublicationStatus }: Props) => {
  const [isSelected, setIsSelected] = useState<boolean>(row?.active as boolean)

  const handleChangeSwitch = () => {
    setIsSelected(!isSelected)
    if (onChangePublicationStatus !== undefined) {
      onChangePublicationStatus(row as GeneralPublicationDataType)
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

export { TablePublicationStatus }
