import { BackComponent } from '@/components/ui/BackComponent'
import { Loader } from '@/components/ui/Loader'
import {
  useGetBidAuctionsById,
  useGetPublicationById
} from '@/hooks/api/usePublications'
import { useRouter } from 'next/navigation'
import React, {
  type Key,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react'
import Gallery from '../lots/transmission/Gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import TabsPublication from '../lots/transmission/TabsPublication'
import { useGetAppUserById } from '@/hooks/api/useClients'
import { AccountType, AuctionType } from '@/types/enums'
import { Edit, Envelope, FacebookColor, GoogleColor } from '@/icons'
import ProfileCard from '../../users-management/clients/ProfileCard'
import {
  Avatar,
  Button,
  Chip,
  Divider,
  Tooltip,
  useDisclosure
} from '@nextui-org/react'
import {
  formatFullDate,
  formatPrice,
  getStatusAuctionLot
} from '@/lib/utils/utils'
import PostNotFound from '../products/PostNotFound'
import { useGetAmountBid } from '@/hooks/api/useBids'
import OfferItem from '../lots/transmission/OfferItem'
import LastOfferCardDetail from './LastOfferCardDetail'
import CustomModal from '@/components/modal/CustomModal'

type AuctionDetailProps = {
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

const AuctionDetail = ({ id }: AuctionDetailProps) => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isNotValidId = isNaN(Number(id))
  const [existPost, setExistPost] = useState<boolean>(false)
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selected, setSelected] = useState('description')
  const [currentIdUser, setCurrentIdUser] = useState<number>(0)

  const handleSelectionChange = (key: Key) => {
    if (typeof key === 'string') {
      setSelected(key)
    }
  }

  const { data: response, isLoading: isLoadingCurrentPublication } =
    useGetPublicationById(Number(id))
  const { data: clientData, isLoading } = useGetAppUserById(
    Number(currentIdUser)
  )

  const publication = useMemo(() => {
    if (response !== undefined) {
      return response.data
    }
    return undefined
  }, [response])

  const { data: amountResponse, isLoading: isLoadingAmount } = useGetAmountBid(
    Number(publication?.auction.starting_price)
  )
  const { data: responseBids } = useGetBidAuctionsById(
    publication?.auction.idauctions ?? 0
  )

  const amountIncreaseBid = useMemo(() => {
    if (amountResponse !== undefined) {
      return amountResponse.data.increment_amount
    }
    return 0
  }, [amountResponse])

  const historyBids = useMemo(() => {
    if (responseBids !== undefined) {
      return responseBids.data
    }
    return []
  }, [responseBids])

  const lastOffer = useMemo(() => {
    if (historyBids?.length > 0) {
      return historyBids.find((_, index) => index === 0)
    }
    return undefined
  }, [historyBids])

  const restOffers = useMemo(() => {
    if (historyBids?.length > 0) {
      return historyBids.filter((_, index) => index !== 0 && index < 4)
    }
    return []
  }, [historyBids])

  const user = useMemo(() => {
    if (clientData !== undefined) {
      return clientData.data
    }
    return null
  }, [clientData])

  const videoUrl = useMemo(() => {
    if (publication !== undefined) {
      if (publication.vehicle.video_galleries !== null) {
        const videoGallery = publication.vehicle.video_galleries?.files
        const videoUrl = videoGallery[0].url
        return videoUrl
      }
      return ''
    } else {
      return ''
    }
  }, [publication])

  const images = useMemo(() => {
    if (publication !== undefined) {
      const images = publication.vehicle.photo_galleries.files ?? []
      const imagesMapped = images.map((item) => ({ original: item.url }))
      return imagesMapped
    } else {
      return []
    }
  }, [publication])

  const giftImages = useMemo(() => {
    if (publication !== undefined) {
      const gifts = publication.vehicle.gift_galleries?.files ?? []
      const giftsMapped = gifts.map((item) => ({ original: item.url }))
      return giftsMapped
    } else {
      return []
    }
  }, [publication])

  const typeAccount = useMemo(() => {
    const typeAccount = getAccountType(user?.firebase_uid?.uid_reference ?? '')
    return typeAccount
  }, [user])

  const accumulate = useMemo(() => {
    if (lastOffer === undefined) {
      return publication?.auction.starting_price
    } else {
      return lastOffer.amount
    }
  }, [publication, lastOffer])

  const dataPublicationCard = useMemo(() => {
    const countryCode =
      publication?.vehicle?.city?.country.country_code.toLowerCase().trim() ??
      ''
    const countryName = publication?.vehicle?.city?.country.country_name ?? ''
    const cityName = publication?.vehicle?.city?.city_name ?? ''
    const publicationCode = publication?.publication_code ?? ''
    const title = publication?.vehicle.name_vehicle
    const price = publication?.vehicle.sale_price
    return {
      countryCode,
      countryName,
      cityName,
      publicationCode,
      title,
      price
    }
  }, [publication])

  const handleReady = () => {
    setIsReady(true)
  }

  useEffect(() => {
    if (isNotValidId) {
      router.replace('/404')
    }
  }, [isNotValidId, router])

  useEffect(() => {
    if (response?.statusCode === 200 && response.data.auction !== null) {
      setExistPost(true)
      setCurrentIdUser(response.data.iduser ?? 0)
    } else {
      setExistPost(false)
    }
  }, [response])

  useEffect(() => {
    if (publication !== undefined && videoUrl !== '' && isReady) {
      setIsPlaying(true)
    }
  }, [videoUrl, publication, isReady])

  const onEditUser = () => {
    router.push(`/users-management/clients/edit/id/${currentIdUser}`)
  }

  const lotCode = useMemo(() => {
    const isDetermined =
      publication?.auction.type_auction === AuctionType.Determined
    const lotCode = publication?.lot?.lot_code
    if (lotCode !== null && lotCode !== undefined) {
      return lotCode
    }
    if (lotCode === null || lotCode === undefined) {
      if (isDetermined) {
        return publication.publication_code
      }
      return 'N/D'
    }
  }, [publication])
  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent
          title='Gestión de Subastas'
          subtitle='Detalles de la Subasta'
        />
      </div>
      {isLoadingCurrentPublication && (
        <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
          <Loader />
        </div>
      )}
      {!isLoadingCurrentPublication && !existPost && <PostNotFound />}
      {!isLoadingCurrentPublication && existPost && (
        <>
          <Divider />
          <div className='grid grid-cols-1 md:grid-cols-3 my-3 gap-y-3 md:gap-x-5 dark:text-white'>
            <div className='border border-default-200 shadow-lg rounded-lg px-4 py-2 flex flex-col items-center justify-center'>
              <span className='font-semibold'>ID SUBASTA:</span>
              <span className='font-semibold'> #{lotCode}</span>
              <div className='border border-gray-400 p-2 font-semibold flex flex-row gap-2 rounded-lg w-fit text-xs'>
                <span>Status:</span>
                <span className='text-cyan-600'>
                  {getStatusAuctionLot(publication?.auction)}
                </span>
              </div>
            </div>
            <div className='border border-default-200  shadow-lg rounded-lg px-8 py-2 flex flex-col items-center'>
              <div className='grid grid-cols-2 w-full text-end mt-2'>
                <span className='text-sm text-start ml-4'>Mínimo</span>
                <span className='text-sm'>
                  {formatPrice(Number(publication?.auction.starting_price))}
                </span>
              </div>
              <div className='grid grid-cols-2 w-full text-end'>
                <span className='text-sm text-start ml-4'>Incremento</span>
                <span className='text-sm'>
                  {isLoadingAmount
                    ? 'Calculando...'
                    : formatPrice(amountIncreaseBid)}
                </span>
              </div>
              <div className='grid grid-cols-2 w-full mt-3 text-end'>
                <span className='font-semibold text-sm'>Total Acumulado</span>
                <span className='font-semibold text-sm'>
                  {formatPrice(Number(accumulate))}
                </span>
              </div>
            </div>

            <div className=''>
              {!isLoading && (
                <div className=' md:w-80 flex flex-row justify-between border border-default-200 shadow-lg rounded-lg p-4'>
                  <ProfileCard client={user} typeAccount={typeAccount} />
                  <Tooltip content='Editar usuario' color='primary'>
                    <div
                      className='p-2 hover:bg-zinc-200 rounded-full h-fit hover:cursor-pointer'
                      onClick={onEditUser}
                    >
                      <Edit className='w-4 h-4' />
                    </div>
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
          <Divider />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-3 dark:text-white'>
            <div className='flex flex-col order-2 md:order-1 '>
              <div className='flex flex-col md:flex-row gap-3 md:items-center justify-between mb-3 mt-2'>
                <span className='font-semibold text-lg'>{`Lote #${publication?.publication_code}`}</span>
                <div className='flex w-full flex-row gap-3 items-center justify-between'>
                  <div className='flex flex-col'>
                    <span className='font-semibold text-sm'>Tipo</span>
                    <span className='text-sm'>
                      {publication?.auction.type_auction ===
                      AuctionType.Determined
                        ? 'Determinada'
                        : 'Martillero'}
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='font-semibold text-sm'>
                      Fecha de Cierre
                    </span>
                    <span className='text-sm'>
                      {formatFullDate(publication?.auction?.end_date?.toString())}
                    </span>
                  </div>
                </div>
              </div>
              <Gallery
                handleReady={handleReady}
                giftsGallery={giftImages}
                imagesGallery={images}
                principalVideoUrl={videoUrl}
                isPlaying={isPlaying}
              />
            </div>
            <div className='flex flex-col gap-4 order-1 md:order-2'>
              {isLoading && (
                <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
                  <Loader />
                </div>
              )}
              <div className='w-full md:w-80 border border-default-200 shadow-lg rounded-lg p-4 md:ml-4'>
                {lastOffer !== undefined && (
                  <LastOfferCardDetail item={lastOffer} />
                )}

                {restOffers?.length > 0 && (
                  <>
                    <div className='flex flex-col gap-2 mt-3 ml-3'>
                      {restOffers.map((item) => (
                        <OfferItem
                          key={item.idbids}
                          countryName={item.user.country?.country_name}
                          countryCode={item.user.country?.country_code
                            .toLowerCase()
                            .trim()}
                          userName={item.user.username}
                          price={item.amount.toString()}
                        />
                      ))}
                    </div>
                    {historyBids?.length > 3 && (
                      <div className='w-full flex justify-center items-center mt-3'>
                        <Button variant='ghost' onClick={onOpen}>
                          Cargar más
                        </Button>
                      </div>
                    )}
                  </>
                )}
                {historyBids?.length === 0 && (
                  <div className='bg-zinc-200 dark:bg-zinc-600 rounded-lg p-4 text-center'>
                    <span className='text-default-500 dark:text-white text-center text-sm'>
                      Aún no existen ofertas para esta subasta
                    </span>
                  </div>
                )}
              </div>
              <div className='w-full md:w-80 border border-default-200 shadow-lg rounded-lg p-4 md:ml-4 mt-2 dark:text-white'>
                <>
                  <div className='flex flex-row gap-4'>
                    <div className='text-start text-default-500 dark:text-white flex flex-row gap-2 justify-start items-center'>
                      {dataPublicationCard.countryName !== '' && (
                        <>
                          <Avatar
                            alt={`Bandera de ${dataPublicationCard.countryName}`}
                            className='w-5 h-5'
                            src={`https://flagcdn.com/${dataPublicationCard.countryCode}.svg`}
                          />
                          <span className='text-xs dark:'>{`${
                            dataPublicationCard.cityName ??
                            'Ciudad no Registrada'
                          }, ${
                            dataPublicationCard.countryName ??
                            'País no Registrado'
                          }`}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <h1 className='font-bold text-black/80 dark:text-white'>
                    {dataPublicationCard.title}
                  </h1>
                  <span className=''>
                    {dataPublicationCard.price !== undefined
                      ? formatPrice(Number(dataPublicationCard.price))
                      : 'Precio Inicial No Registrado'}
                  </span>
                </>
                <div className='flex flex-row mt-2 gap-12'>
                  <div className='flex flex-col'>
                    <span className='font-semibold text-default-700 text-sm'>
                      Status
                    </span>
                    <div>
                      <Chip
                        color={
                          publication?.active === true ? 'success' : 'danger'
                        }
                        size='sm'
                      >
                        {publication?.active === true ? 'Activo' : 'No activo'}
                      </Chip>
                    </div>
                  </div>
                  <div className='flex flex-col gap-0.5'>
                    <span className='font-semibold text-default-700 text-sm'>
                      Fecha creación
                    </span>
                    <span className='text-default-700 text-sm'>
                      {formatFullDate(publication?.createdAt?.toString() ?? '')}
                    </span>
                  </div>
                </div>
              </div>
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
          <CustomModal
            titleModal={'Últimas ofertas'}
            isOpen={isOpen}
            onClose={onClose}
            size='md'
            backdrop='opaque'
          >
            <div className='flex flex-col dark:text-white mb-3'>
              {historyBids.map((item) => (
                <OfferItem
                  key={item.idbids}
                  countryName={item.user.country?.country_name}
                  countryCode={item.user.country?.country_code
                    .toLowerCase()
                    .trim()}
                  userName={item.user.username}
                  price={item.amount.toString()}
                />
              ))}
            </div>
          </CustomModal>
        </>
      )}
    </>
  )
}

export default AuctionDetail
