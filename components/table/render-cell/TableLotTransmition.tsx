import { useInProgressLot } from '@/hooks/api/useLots'
import useSocket from '@/hooks/socket/useSocket'
import { showToast } from '@/hooks/useToast'
import { cn } from '@/lib/clsx/clsx'
import { isSameDate } from '@/lib/utils/utils'
import { LotStatus } from '@/types/enums'
import { Button } from '@nextui-org/react'
import { DateTime } from 'luxon'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}
const TableLotTransmission = ({ row }: Props) => {
  const socket = useSocket()
  const { mutateAsync: changeStatusLot, isPending } = useInProgressLot()
  const router = useRouter()

  const isInprogress = row.status === LotStatus.InProgress
  const id = Number(row.id)

  const utcDateTime = DateTime.fromISO(row.transmission_date as string, {
    zone: 'utc'
  })

  const localDateTime = utcDateTime.setZone(DateTime.local().zoneName)

  const currentLocalDateTime = DateTime.local()

  const diff = localDateTime.diff(
    currentLocalDateTime,
    'milliseconds'
  ).milliseconds

  const isInactive = diff >= 0

  const isDisabled =
    row.status === LotStatus.Active &&
    !isSameDate(row.transmission_date as string)
  const isEnabled =
    row.status === LotStatus.Active &&
    isSameDate(row.transmission_date as string)

  const handleClick = async () => {
    await changeStatusLot(id, {
      onSuccess: (data) => {
        socket?.emit('lotStart', { idLot: id })
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
    handleRedirectTransmission()
  }
  const handleRedirectTransmission = () => {
    router.push(`/post-management/lots/id/${id}/transmission`)
  }

  return (
    <div>
      {isInprogress && (
        <Button color='success' onClick={handleRedirectTransmission}>
          En progreso
        </Button>
      )}
      {isDisabled && (
        <Button
          color='default'
          disabled
          className='hover:cursor-not-allowed bg-gray-200 dark:bg-zinc-500 w-full'
        >
          <span className='text-default-400 dark:text-default-200'>
            Iniciar
          </span>
        </Button>
      )}
      {isEnabled && (
        <Button
          className={cn({
            'hover:cursor-not-allowed bg-gray-200': isInactive,
            'w-full': !isInactive
          })}
          color={isInactive ? 'default' : 'primary'}
          onClick={isInactive ? () => {} : handleClick}
          isLoading={isPending}
          disabled={isInactive}
        >
          <span className={isInactive ? 'text-default-400' : ''}>Iniciar</span>
        </Button>
      )}
    </div>
  )
}

export { TableLotTransmission }
