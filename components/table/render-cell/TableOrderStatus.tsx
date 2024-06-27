import { type OrderDataType } from '@/types/api/response/orders'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}
const TableOrderStatus = ({ row }: Props) => {
  const data = row as OrderDataType
  const status = data.history[0]

  return (
    <div className='dark:text-white text-center'>
      {status?.orderStatus.name_status ?? 'Sin estado'}
    </div>
  )
}

export { TableOrderStatus }
