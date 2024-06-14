import { BackComponent } from '@/components/ui/BackComponent'
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
import {
  type ReactNode
} from 'react'
import ProfileCard from '../../users-management/clients/ProfileCard'
import { type OrderDetailResponse } from '@/types/api/response/orders'
import { Loader } from '@/components/ui/Loader'
import { formatPrice, parseIsoDate } from '@/lib/utils/utils'
import CustomAgentCard from './CustomAgentCard'
import OrderAddress from '../OrderAddress'
import Gallery from '../../post-management/lots/transmission/Gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import InfoPublicationCard from './InfoPublicationCard'
import OrderStatus from './OrderStatus'
import TabsPublication from '../../post-management/lots/transmission/TabsPublication'
import InfoCard from '@/components/cards/InfoCard'
import CustomModal from '@/components/modal/CustomModal'
import CustomAgentsAutocomplete from '@/components/autocomplete/CustomAgentsAutocomplete'
import { GenericButton } from '@/components'
import CustomTextarea from '@/components/textarea/CustomTextarea'
import useOrderDetail from '@/hooks/order/useOrderDetail'

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
  const {
    isLoading,
    order,
    buyerInfo,
    sellerInfo,
    typeBuyerAccount,
    typeSellerAccount,
    publication,
    videoUrl,
    images,
    giftImages,
    isEditAgent,
    handleChangeCustomAgentBuyer,
    handleChangeCustomAgentSeller,
    handleSelectionChange,
    selected,
    isPending,
    isPendingCancel,
    reason,
    setReason,
    onEditBuyer,
    onEditSeller,
    isOpen,
    onOpen,
    isOpenCancelModal,
    onOpenCancelModal,
    onCloseCancelModal,
    isOpenSeller,
    isLoadingBuyerInfo,
    isLoadingSellerInfo,
    isPlaying,
    handleReady,
    handleOpenEditAgentBuyer,
    handleOpenEditAgentSeller,
    handleCloseEditAgentBuyer,
    handleCloseEditAgentSeller,
    handleUpdateBuyerAgent,
    handleUpdateSellerAgent,
    onCancelOrder,
    onOpenSeller,
    currentAgentBuyer,
    currentAgentSeller
  } = useOrderDetail({ id, getAccountType })

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
                      onClick={onEditBuyer}
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
                      onClick={onEditSeller}
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
                      <Button className=' h-6' onClick={onOpen}>
                        {' '}
                        + Asignar Agente
                      </Button>
                    </div>
                  </div>
                )}
                {order?.customsAgent !== null && (
                  <div className=' flex flex-row justify-between w-full items-center'>
                    <CustomAgentCard agent={order?.customsAgent} />
                    <Tooltip content='Cambiar Agente' color='primary'>
                      <div
                        className='p-2 hover:bg-zinc-200 rounded-full h-fit hover:cursor-pointer'
                        onClick={handleOpenEditAgentBuyer}
                      >
                        <Edit className='w-4 h-4' />
                      </div>
                    </Tooltip>
                  </div>
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
                      <Button className=' h-6' onClick={onOpenSeller}>
                        {' '}
                        + Asignar Agente
                      </Button>
                    </div>
                  </div>
                )}
                {order?.customs_agent_port_origin !== null && (
                  <div className=' flex flex-row justify-between w-full'>
                    <CustomAgentCard agent={order?.customs_agent_port_origin} />
                    <Tooltip content='Cambiar agente' color='primary'>
                      <div
                        className='p-2 hover:bg-zinc-200 rounded-full h-fit hover:cursor-pointer'
                        onClick={handleOpenEditAgentSeller}
                      >
                        <Edit className='w-4 h-4' />
                      </div>
                    </Tooltip>
                  </div>
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
                  <div
                    className='flex flex-row justify-between items-center hover:cursor-pointer hover:bg-zinc-100 rounded-lg'
                    onClick={
                      order.active === null ? onOpenCancelModal : undefined
                    }
                  >
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
          <CustomModal
            titleModal={`${
              isEditAgent ? 'Editar' : 'Asignar'
            } Agente aduanero para el comprador`}
            isOpen={isOpen}
            onClose={handleCloseEditAgentBuyer}
          >
            <div>
              <CustomAgentsAutocomplete
                currentCustomAgent={currentAgentBuyer}
                changeCustomAgent={handleChangeCustomAgentBuyer}
                error=''
              />
              <div className='mb-3 mt-4'>
                <GenericButton
                  label={isEditAgent ? 'Actualizar agente' : 'Asignar agente'}
                  onClick={handleUpdateBuyerAgent}
                  isLoading={isPending}
                  disabled={isPending}
                />
              </div>
            </div>
          </CustomModal>
          <CustomModal
            titleModal={'Asignar Agente aduanero para el vendedor'}
            isOpen={isOpenSeller}
            onClose={handleCloseEditAgentSeller}
          >
            <div>
              <CustomAgentsAutocomplete
                currentCustomAgent={currentAgentSeller}
                changeCustomAgent={handleChangeCustomAgentSeller}
                error=''
              />
              <div className='mb-3 mt-4'>
                <GenericButton
                  label={isEditAgent ? 'Actualizar agente' : 'Asignar agente'}
                  onClick={handleUpdateSellerAgent}
                  isLoading={isPending}
                  disabled={isPending}
                />
              </div>
            </div>
          </CustomModal>
          <CustomModal
            titleModal={'Cancelar orden de venta'}
            isOpen={isOpenCancelModal}
            onClose={onCloseCancelModal}
          >
            <div>
              <div>
                <p>
                  Escriba el motivo por la cual desea cancelar la orden de
                  venta.
                </p>
                <CustomTextarea
                  label={'Motivo'}
                  name='reason'
                  placeholder='Ingrese el motivo'
                  error=''
                  value={reason ?? ''}
                  onChange={(e) => {
                    setReason(e.target.value)
                  }}
                />
              </div>
              <div className='mb-3 mt-4 flex gap-3'>
                <div className='md:w-1/2 w-full'>
                  <GenericButton
                    type='button'
                    className='bg-red-700 text-white uppercase font-bold w-full dark:border dark:border-red-500'
                    label={'Cancelar'}
                    onClick={onCloseCancelModal}
                    disabled={isPendingCancel}
                  />
                </div>
                <div className='md:w-1/2 w-full'>
                  <GenericButton
                    label={isPendingCancel ? 'Cancelando orden' : 'Continuar'}
                    onClick={onCancelOrder}
                    isLoading={isPendingCancel}
                    disabled={isPendingCancel}
                  />
                </div>
              </div>
            </div>
          </CustomModal>
        </>
      )}
    </>
  )
}
export default OrderDetail
