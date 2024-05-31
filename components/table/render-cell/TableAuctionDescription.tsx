import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}
const TableAuctionDescription = ({ row }: Props) => {
  const description = row?.vehicle?.vehicle_description ?? 'Sin descripción'
  const lengthDescription = description?.length
  return (
    <div
      className={`text-sm max-w-44 ${
        lengthDescription > 35
          ? ' whitespace-nowrap overflow-hidden overflow-ellipsis'
          : ''
      }`}
    >
      {description}
    </div>
  )
}

export { TableAuctionDescription }
