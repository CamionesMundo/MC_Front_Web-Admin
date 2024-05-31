import { type GeneralPublicationDataType } from '@/types/api/response/publication'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TablePromotion = ({ row }: Props) => {
  const data = row as GeneralPublicationDataType
  const isPromotion = data.promotion ?? false
  return <div className='text-center'>{isPromotion ? 'Promocionado' : '--'}</div>
}

export { TablePromotion }
