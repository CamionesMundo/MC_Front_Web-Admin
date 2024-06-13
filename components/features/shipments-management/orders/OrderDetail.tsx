import { BackComponent } from '@/components/ui/BackComponent'
import { useGetAppUserById } from '@/hooks/api/useClients'
import { useGetOrderById } from '@/hooks/api/useOrders'
import {
  Cancel,
  ChevronRight,
  Edit,
  Envelope,
  FacebookColor,
  GoogleColor,
  Location,
  Message
} from '@/icons'
import { AccountType, AuctionType, PublicationType } from '@/types/enums'
import {
  Button,
  Divider,
  Spacer,
  Tooltip
} from '@nextui-org/react'
import { type ReactNode, useMemo, useState, useEffect, type Key } from 'react'
import ProfileCard from '../../users-management/clients/ProfileCard'
import {
  type OrderDetailResponse
} from '@/types/api/response/orders'
import { Loader } from '@/components/ui/Loader'
import { formatPrice, parseIsoDate } from '@/lib/utils/utils'
import CustomAgentCard from './CustomAgentCard'
import OrderAddress from '../OrderAddress'
import Gallery from '../../post-management/lots/transmission/Gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import InfoPublicationCard from './InfoPublicationCard'
import OrderStatus from './OrderStatus'
import TabsPublication from '../../post-management/lots/transmission/TabsPublication'
import { useGetPublicationById } from '@/hooks/api/usePublications'
import InfoCard from '@/components/cards/InfoCard'

type OrderDetailProps = {
  id: string
}

const getAccountType = (accountType: string): ReactNode => {
  switch (accountType) {
    case AccountType.Facebook:
      return (
        <div className='flex flex-row gap-2 items-center'>
          <FacebookColor className=' w-3 h-3' />
          <span className='text-sm text-default-500 text-wrap'>
            {'Usuario de Facebook'}
          </span>
        </div>
      )
    case AccountType.Google:
      return (
        <div className='flex flex-row gap-2 items-center'>
          <GoogleColor className=' w-3 h-3' />
          <span className='text-sm text-default-500 text-wrap'>
            {'Usuario de Google'}
          </span>
        </div>
      )
    case AccountType.Email:
      return (
        <div className='flex flex-row gap-2 items-center'>
          <Envelope className=' w-3 h-3' />
          <span className='text-sm text-default-500 text-wrap'>
            {'Usuario con Correo'}
          </span>
        </div>
      )
    default:
      return (
        <span className='text-sm text-default-500 text-wrap'>
          {'Tipo de cuenta desconocida'}
        </span>
      )
  }
}

const getTypeOrigin = (data: OrderDetailResponse | undefined) => {
  if (data === undefined) return ''
  const type = data.publication?.type_publication

  if (type === PublicationType.PostVehicle) {
    return 'Publicación'
  }
  if (type === PublicationType.Rent) {
    return 'Renta'
  }
  if (type === PublicationType.Auction) {
    if (data.publication.auction?.type_auction === AuctionType.Determined) {
      return 'Subasta Determinada'
    }
    if (data.publication.auction?.type_auction === AuctionType.Auctioneer) {
      return 'Subasta c/Martillero'
    }
  }

  return 'Tipo no registrado'
}
const OrderDetail = ({ id }: OrderDetailProps) => {
  const { data: detailResponse, isLoading } = useGetOrderById(Number(id))
  const { data: buyerResponse, isLoading: isLoadingBuyerInfo } =
    useGetAppUserById(Number(detailResponse?.data.iduser_buyer))

  const { data: sellerResponse, isLoading: isLoadingSellerInfo } =
    useGetAppUserById(Number(detailResponse?.data.publication.iduser))
  const { data: publicationResponse } =
    useGetPublicationById(Number(detailResponse?.data.idpublication))

  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selected, setSelected] = useState('description')

  const handleSelectionChange = (key: Key) => {
    if (typeof key === 'string') {
      setSelected(key)
    }
  }
  const order = useMemo(() => {
    if (detailResponse !== undefined) {
      return detailResponse.data
    } else {
      return undefined
    }
  }, [detailResponse])

  const buyerInfo = useMemo(() => {
    if (buyerResponse !== undefined) {
      return buyerResponse.data
    }
    return undefined
  }, [buyerResponse])

  const sellerInfo = useMemo(() => {
    if (sellerResponse !== undefined) {
      return sellerResponse.data
    }
    return undefined
  }, [sellerResponse])

  const typeBuyerAccount = useMemo(() => {
    const typeAccount = getAccountType(
      buyerInfo?.firebase_uid?.uid_reference ?? ''
    )
    return typeAccount
  }, [buyerInfo])

  const typeSellerAccount = useMemo(() => {
    const typeAccount = getAccountType(
      sellerInfo?.firebase_uid?.uid_reference ?? ''
    )
    return typeAccount
  }, [sellerInfo])

  const publication = useMemo(() => {
    if (publicationResponse !== undefined) {
      return publicationResponse.data
    }
    return undefined
  }, [publicationResponse])

  const handleReady = () => {
    setIsReady(true)
  }

  const videoUrl = useMemo(() => {
    if (order?.publication !== undefined) {
      if (order?.publication.vehicle.video_galleries !== null) {
        const videoGallery = order?.publication.vehicle.video_galleries?.files
        const videoUrl = videoGallery[0].url
        return videoUrl
      }
      return ''
    } else {
      return ''
    }
  }, [order?.publication])

  const images = useMemo(() => {
    if (order?.publication !== undefined) {
      const images = order?.publication.vehicle.photo_galleries.files ?? []
      const imagesMapped = images.map((item) => ({ original: item.url }))
      return imagesMapped
    } else {
      return []
    }
  }, [order?.publication])

  const giftImages = useMemo(() => {
    if (order?.publication !== undefined) {
      const gifts = order?.publication.vehicle.gift_galleries?.files ?? []
      const giftsMapped = gifts.map((item) => ({ original: item.url }))
      return giftsMapped
    } else {
      return []
    }
  }, [order?.publication])

  useEffect(() => {
    if (order?.publication !== undefined && videoUrl !== '' && isReady) {
      setIsPlaying(true)
    }
  }, [videoUrl, order?.publication, isReady])
  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent title='Gestión de Ventas' subtitle='Detalles de Venta' />
      </div>
      <Spacer />
      <Divider />
      <Spacer />
      {isLoading && (
        <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
          <Loader />
        </div>
      )}
      {!isLoading && order !== undefined && (
        <>
          <div className='grid p-2 sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-x-5'>
            <div className='flex flex-col w-full'>
              <span className='text-sm font-semibold dark:text-white text-blackText'>
                Comprador
              </span>
              {isLoadingBuyerInfo && (
                <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
                  <Loader />
                </div>
              )}
              {!isLoadingBuyerInfo && buyerInfo !== undefined && (
                <div className=' flex flex-row justify-between border border-default-200 shadow-lg rounded-lg p-4'>
                  <ProfileCard
                    client={buyerInfo}
                    typeAccount={typeBuyerAccount}
                  />
                  <Tooltip content='Editar comprador' color='primary'>
                    <div
                      className='p-2 hover:bg-zinc-200 rounded-full h-fit hover:cursor-pointer'
                      onClick={undefined}
                    >
                      <Edit className='w-4 h-4' />
                    </div>
                  </Tooltip>
                </div>
              )}
            </div>
            <div className='flex flex-col w-full'>
              <span className='text-sm font-semibold dark:text-white text-blackText'>
                Vendedor
              </span>
              {isLoadingSellerInfo && (
                <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
                  <Loader />
                </div>
              )}
              {!isLoadingSellerInfo && sellerInfo !== undefined && (
                <div className=' flex flex-row justify-between border border-default-200 shadow-lg rounded-lg p-4'>
                  <ProfileCard
                    client={sellerInfo}
                    typeAccount={typeSellerAccount}
                  />
                  <Tooltip content='Editar vendedor' color='primary'>
                    <div
                      className='p-2 hover:bg-zinc-200 rounded-full h-fit hover:cursor-pointer'
                      onClick={undefined}
                    >
                      <Edit className='w-4 h-4' />
                    </div>
                  </Tooltip>
                </div>
              )}
            </div>
            <div className='p-4'>
              <div className='flex justify-between'>
                <div className='flex flex-col h-full'>
                  <span className='text-sm font-semibold dark:text-white text-blackText'>
                    Origen Venta
                  </span>
                  <span className='text-sm dark:text-white'>
                    {getTypeOrigin(order)}
                  </span>
                </div>
              </div>
              <div className='w-full flex flex-col mt-2'>
                <span className='text-sm font-semibold dark:text-white text-blackText'>
                  {'Fecha venta / adjudicación'}
                </span>
                <span className='text-sm dark:text-white'>
                  {parseIsoDate(order?.createdAt.toString())}
                </span>
              </div>
            </div>
          </div>
          <div className='grid p-2 sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-x-5'>
            <div className='flex flex-col w-full'>
              <span className='text-sm font-semibold dark:text-white text-blackText'>
                Agente Aduanero del comprador
              </span>
              <div className=' flex flex-row justify-between p-4 h-[84px]'>
                {order?.customsAgent === null && (
                  <div className='w-full h-full items-center flex flex-col justify-center text-sm text-default-600 dark:text-white'>
                    <span>Agente no seleccionado</span>
                    <div className='w-fit mt-2'>
                      <Button className=' h-6'> + Asignar Agente</Button>
                    </div>
                  </div>
                )}
                {order?.customsAgent !== null && (
                  <CustomAgentCard agent={order?.customsAgent} />
                )}
              </div>
            </div>
            <div className='flex flex-col w-full'>
              <span className='text-sm font-semibold dark:text-white text-blackText'>
                Agente Aduanero del vendedor
              </span>
              <div className=' flex flex-row justify-between p-4 h-[84px]'>
                {order?.customs_agent_port_origin === null && (
                  <div className='w-full h-full items-center flex flex-col justify-center text-sm text-default-600 dark:text-white'>
                    <span>Agente no seleccionado</span>
                    <div className='w-fit mt-2'>
                      <Button className=' h-6'> + Asignar Agente</Button>
                    </div>
                  </div>
                )}
                {order?.customs_agent_port_origin !== null && (
                  <CustomAgentCard agent={order?.customs_agent_port_origin} />
                )}
              </div>
            </div>
            <div className='w-full flex flex-col px-4 py-2'>
              <div className='w-full flex flex-row justify-between'>
                <div className='flex flex-col'>
                  <span className='text-sm font-semibold dark:text-white text-blackText'>
                    ID Publicación
                  </span>
                  <span className='font-semibold'>
                    {'#'}
                    {order?.publication.publication_code}
                  </span>
                </div>
                <div className='h-full flex flex-row items-center text-blackText dark:text-white gap-1'>
                  <Button
                    className=' bg-cyan-700 font-semibold text-white'
                    startContent={<Message className='w-4 h-4 ' />}
                  >
                    MENSAJE
                  </Button>
                </div>
              </div>
              <div className='w-full flex justify-between mt-2'>
                <div className='flex flex-col'>
                  <span className='text-sm font-semibold dark:text-white text-blackText'>
                    ID Subasta
                  </span>
                  <span>revisar</span>
                </div>
                <div className='flex flex-col items-end'>
                  <span className='text-sm font-semibold dark:text-white text-blackText'>
                    Precio Final
                  </span>
                  <span className='text-lg'>
                    {formatPrice(Number(order?.order_amount))}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <Spacer />
          <div className='w-full p-2'>
            <span className='text-sm font-semibold dark:text-white text-blackText'>
              Dirección de Recepción
            </span>
            <div className='grid p-2 sm:grid-cols-2 grid-cols-1 md:grid-cols-3 gap-x-5'>
              <div className=' h-fit flex flex-col border border-default-200 rounded-lg'>
                <div className='flex flex-row gap-2 items-center border-b border-default-200 p-3'>
                  <Location className='w-4 h-4 dark:text-white' />
                  <span className='text-sm font-semibold md:text-sm dark:text-white'>
                    Sede Principal
                  </span>
                </div>
                <div className='px-3 pb-3'>
                  <OrderAddress item={order?.address} />
                </div>
              </div>
              <div className=' h-fit flex flex-col border border-default-200 rounded-lg '>
                <div className='flex flex-row items-center gap-2 w-full dark:text-white border-b border-default-200 p-3'>
                  <Cancel className='w-4 h-4' />
                  <span className='font-semibold text-sm'>
                    {'¿Deseas cancelar la orden ?'}
                  </span>
                </div>
                <div className='w-full p-3'>
                  <div className='flex flex-row justify-between items-center hover:cursor-pointer hover:bg-zinc-100 rounded-lg'>
                    <span className='text-sm ml-5'>Cancelar orden</span>
                    <div className='p-2 flex justify-center items-center rounded-full border border-default-200'>
                      <ChevronRight className='w-3 h-3' />
                    </div>
                  </div>
                </div>
              </div>
              <InfoPublicationCard order={order} />
            </div>
          </div>
          <Divider />
          <Spacer />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-3 dark:text-white'>
            <div className='flex flex-col order-2 md:order-1 '>
              <div className='flex flex-col mt-3 mb-4'>
                <span className='font-semibold text-large'>Galería</span>
                <span className=''>
                  Fotos y videos de la publicación (incluye fotos del regalo)
                </span>
                <InfoCard content='En caso de que la publicación no tenga video, se mostrará el texto "No tiene videos" y si no tiene regalo, se mostrará el texto "No tiene regalo"' />
              </div>
              <Gallery
                handleReady={handleReady}
                giftsGallery={giftImages}
                imagesGallery={images}
                principalVideoUrl={videoUrl}
                isPlaying={isPlaying}
              />
              <InfoCard content='En los siguientes "Tabs" podrás ver la descripción y características que han sido creadas por el propietario del vehículo, así como el detalle del regalo.' />
            </div>
            <div className='flex flex-col gap-4 order-1 md:order-2'>
              <OrderStatus history={order.history} />
            </div>
          </div>
          <div className='mt-4 md:mt-0'>
            <TabsPublication
              publication={publication}
              giftsGallery={giftImages}
              selected={selected}
              handleSelectionChange={handleSelectionChange}
            />
          </div>
        </>
      )}
    </>
  )
}
export default OrderDetail
