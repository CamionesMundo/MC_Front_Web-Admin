import { type AuctionsResponse } from '@/types/api/response/lots'
import { TypeAuctionStatus } from '@/types/enums'
import React from 'react'
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableAuctionStatus = ({ row }: Props) => {
  const data = row as AuctionsResponse
  const getStatus = () => {
    const status = data.auction?.type_status.type_name

    if (status === TypeAuctionStatus.Active) {
      return 'Activo'
    }
    if (status === TypeAuctionStatus.InProgress) {
      return 'En progreso'
    }

    if (status === TypeAuctionStatus.Pending) {
      return 'Pendiente'
    }

    if (status === TypeAuctionStatus.Awarded) {
      return 'Adjudicado'
    }

    if (status === TypeAuctionStatus.NoBidder) {
      return 'Sin postor'
    }

    if (status === TypeAuctionStatus.UnderReview) {
      return 'En revisión'
    }

    return 'Sin estado'
  }
  return (
    <div className='text-center text-black dark:text-white'>{getStatus()}</div>
  )
}

export { TableAuctionStatus }
