import { type OrderDataType } from '@/types/api/response/orders'
import { AuctionType, PublicationType } from '@/types/enums'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableOrderOrigin = ({ row }: Props) => {
  const data = row as OrderDataType
  const getType = () => {
    const type = data.publication?.type_publication
    if (type === PublicationType.PostVehicle) {
      return 'Publicación'
    }
    if (type === PublicationType.Rent) {
      return 'Renta'
    }
    if (type === PublicationType.Auction) {
      if (data.publication.auction.type_auction === AuctionType.Determined) {
        return 'Subasta Determinada'
      }
      if (data.publication.auction.type_auction === AuctionType.Auctioneer) {
        return 'Subasta c/Martillero'
      }
    }

    return 'Tipo no registrado'
  }
  return (
    <div className='text-center text-black dark:text-white'>{getType()}</div>
  )
}

export { TableOrderOrigin }
