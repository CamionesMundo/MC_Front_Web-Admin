import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
  index: number
}
const TablePosition = ({ row, index }: Props) => {
  return (
    <div className='text-black dark:text-white text-sm text-center flex flex-row w-20 items-center gap-1'>
      <span>{`# ${row.order} `}</span>
      {index === 0 && (
        <span className='text-red-600 text-xs font-semibold'>Próximo</span>
      )}
    </div>
  )
}

export { TablePosition }
