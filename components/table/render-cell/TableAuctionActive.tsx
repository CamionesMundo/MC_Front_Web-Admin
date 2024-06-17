import { type AuctionFilterDataType } from '@/types/api/response/publication'
import { AuctionType } from '@/types/enums'
import { Switch, Tooltip } from '@nextui-org/react'
import { useState } from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
  onChangeStatusRow?: (row: AuctionFilterDataType) => void
}

const TableAuctionActive = ({ row, onChangeStatusRow }: Props) => {
  const data = row as AuctionFilterDataType
  const [isSelected, setIsSelected] = useState<boolean>(data?.active as boolean)
  const isDetermined = data.auction.type_auction === AuctionType.Determined
  const handleChangeSwitch = () => {
    setIsSelected(!isSelected)
    if (onChangeStatusRow !== undefined) {
      onChangeStatusRow(data)
    }
  }
  return (
    <>
      {isDetermined && (
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
      )}
      {!isDetermined && (
        <div className='flex justify-center hover:cursor-not-allowed'>
          <Switch
            size='sm'
            isSelected={isSelected}
            disabled
            classNames={{ wrapper: '!bg-zinc-300 hover:cursor-not-allowed' }}
          />
        </div>
      )}
    </>
  )
}

export { TableAuctionActive }
