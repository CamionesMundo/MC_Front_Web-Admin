import { formatPrice } from '@/lib/utils/utils'
import { type OrderDataType } from '@/types/api/response/orders'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}
const TableOrderPrice = ({ row }: Props) => {
  const data = row as OrderDataType

  return (
    <div className='dark:text-white text-center'>
      {'USD '}
      {formatPrice(Number(data.order_amount))}
    </div>
  )
}

export { TableOrderPrice }
