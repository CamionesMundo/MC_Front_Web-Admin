import { BackComponent } from '@/components/ui/BackComponent'
import { Loader } from '@/components/ui/Loader'
import { useGetPublicationById } from '@/hooks/api/usePublications'
import { useRouter } from 'next/navigation'
import React, {
  type Key,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react'
import PostNotFound from './PostNotFound'
import Gallery from '../lots/transmission/Gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import TabsPublication from '../lots/transmission/TabsPublication'
import { useGetAppUserById } from '@/hooks/api/useClients'
import { AccountType } from '@/types/enums'
import { Edit, Envelope, FacebookColor, GoogleColor } from '@/icons'
import ProfileCard from '../../users-management/clients/ProfileCard'
import { Avatar, Chip, Divider, Tooltip } from '@nextui-org/react'
import { formatFullDate, formatPrice } from '@/lib/utils/utils'

type ProductDetailProps = {
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

const ProductDetail = ({ id }: ProductDetailProps) => {
  const router = useRouter()
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
    if (user !== null) {
      const typeAccount = getAccountType(
        user?.firebase_uid?.uid_reference ?? ''
      )
      return typeAccount
    }
    return null
  }, [user])

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
    if (response?.statusCode === 200 && response.data.auction === null) {
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
  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent
          title='Gestión de publicaciones'
          subtitle='Detalles de Publicación'
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

          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-2'>
            <div className='flex flex-col order-2 md:order-1'>
              <span className='font-semibold text-lg dark:text-white'>{`Lote #${publication?.publication_code}`}</span>
              <div className='shadow-lg h-full rounded-lg'>
                <Gallery
                  handleReady={handleReady}
                  giftsGallery={giftImages}
                  imagesGallery={images}
                  principalVideoUrl={videoUrl}
                  isPlaying={isPlaying}
                />
              </div>
            </div>
            <div className='flex flex-col gap-4 p-0 md:ml-4 mt-1 order-1 md:order-2'>
              {isLoading && (
                <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
                  <Loader />
                </div>
              )}
              {!isLoading && (
                <div className=' w-full md:w-80 flex flex-row justify-between border border-default-200 rounded-lg p-4 mt-4 shadow-lg'>
                  <ProfileCard client={user} typeAccount={typeAccount} />
                  <Tooltip content='Editar usuario' color='primary'>
                    <div
                      className='p-2 md:bg-none bg-default-200 hover:bg-zinc-200 rounded-full h-fit hover:cursor-pointer'
                      onClick={onEditUser}
                    >
                      <Edit className='w-4 h-4 dark:text-white' />
                    </div>
                  </Tooltip>
                </div>
              )}
              <div className='w-full md:w-80 border border-default-200 rounded-lg p-4 shadow-lg'>
                <>
                  <div className='flex flex-row gap-4'>
                    <div className='text-start text-default-500 dark:text-white flex flex-row gap-2 justify-start items-center'>
                      {dataPublicationCard.countryName !== '' && (
                        <Avatar
                          alt={`Bandera de ${dataPublicationCard.countryName}`}
                          className='w-5 h-5'
                          src={`https://flagcdn.com/${dataPublicationCard.countryCode}.svg`}
                        />
                      )}
                      <span className='text-xs'>{`${
                        dataPublicationCard.cityName ?? 'Ciudad no Registrada'
                      }, ${
                        dataPublicationCard.countryName ?? 'País no Registrado'
                      }`}</span>
                    </div>
                  </div>
                  <h1 className='font-bold text-black/80 dark:text-white'>
                    {dataPublicationCard.title}
                  </h1>
                  <span className='dark:text-white'>
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
          <div className='mt-4 px-2 md:px-0'>
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

export default ProductDetail
