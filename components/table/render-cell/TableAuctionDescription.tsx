import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}
const TableAuctionDescription = ({ row }: Props) => {
  const description =
    row?.publication?.vehicle?.vehicle_description ?? 'Sin descripción'
  const lengthDescription = description?.length
  return (
    <div
      className={`text-sm ${
        lengthDescription > 45
          ? ' whitespace-nowrap overflow-hidden overflow-ellipsis'
          : ''
      }`}
    >
      {description}
    </div>
  )
}

export { TableAuctionDescription }
