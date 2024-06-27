import { type GeneralPublicationDataType } from '@/types/api/response/publication'
import { PublicationType } from '@/types/enums'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}
const TableTypePublication = ({ row }: Props) => {
  const data = row as GeneralPublicationDataType
  const getType = () => {
    const type = data.type_publication

    if (type === PublicationType.PostVehicle) {
      return 'Publicación'
    }

    if (type === PublicationType.Rent) {
      return 'Renta'
    }

    if (type === PublicationType.Auction) {
      return 'Subasta'
    }
    return 'Tipo no registrado'
  }
  return (
    <div className='text-center text-black dark:text-white'>{getType()}</div>
  )
}

export { TableTypePublication }
