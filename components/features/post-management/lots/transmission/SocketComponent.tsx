import React, { useEffect, useMemo, useState } from 'react'
import CountDown from './CountDown'
import LastOfferCard from './LastOfferCard'
import { Button, useDisclosure } from '@nextui-org/react'
import OfferItem from './OfferItem'
import { useGetBidAuctionsById } from '@/hooks/api/usePublications'
import { formatPrice, getStatusAuctionLot } from '@/lib/utils/utils'
import { useGetAmountBid } from '@/hooks/api/useBids'
import CustomModal from '@/components/modal/CustomModal'
import { useLiveTransmissionStore } from '@/store/useLiveTransmission'

type SocketComponentProps = {
  isLoadingTotalCount: boolean
}

const SocketComponent = ({
  isLoadingTotalCount
}: SocketComponentProps) => {
  const { currentAuctionId, count, secondsPercent, currentBid, publication, hasWinner, isAuctionFinished } = useLiveTransmissionStore()
  const startingPrice = Number(publication?.auction.starting_price)
  const auctionStatus = getStatusAuctionLot(publication?.auction)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [initialAmount, setInitialAmount] = useState(0)
  const { data: response, refetch } = useGetBidAuctionsById(currentAuctionId ?? 0)
  const { data: amountResponse, isLoading: isLoadingAmount } =
    useGetAmountBid(startingPrice)

  const amountIncreaseBid = useMemo(() => {
    if (amountResponse !== undefined) {
      return amountResponse.data.increment_amount
    }
    return 0
  }, [amountResponse])
  const historyBids = useMemo(() => {
    if (response !== undefined) {
      return response.data
    }
    return []
  }, [response])

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

  useEffect(() => {
    if ((isAuctionFinished && hasWinner) || currentBid !== undefined) {
      refetch()
        .then()
        .catch((error) => {
          console.error(
            'Error al volver a obtener los datos de la subasta:',
            error
          )
        })
    }
  }, [refetch, isAuctionFinished, currentBid, hasWinner])

  useEffect(() => {
    if (currentBid === undefined && lastOffer === undefined) {
      setInitialAmount(startingPrice)
    }
    if (currentBid === undefined && lastOffer !== undefined) {
      setInitialAmount(lastOffer.amount)
    }
    if (currentBid !== undefined) {
      setInitialAmount(currentBid.currentPrice)
    }
  }, [currentBid, lastOffer, startingPrice])
  return (
    <div className=' w-[450px] mx-auto'>
      <div className='mt-5 flex flex-row justify-between items-center px-12 my-3'>
        {!isLoadingTotalCount && (
          <CountDown
            countryName={lastOffer?.user.country?.country_name}
            countryCode={lastOffer?.user.country?.country_code
              .toLowerCase()
              .trim()}
            seconds={count}
            secondsPercent={secondsPercent}
          />
        )}
        {isLoadingTotalCount && <div></div>}
        <div className='flex-col'>
          <div className='flex justify-between w-full gap-5'>
            <span>Mínimo</span>
            <span>{formatPrice(startingPrice)}</span>
          </div>
          <div className='flex justify-between w-full gap-5'>
            <span>Incremento</span>
            <span>
              {isLoadingAmount
                ? 'Calculando...'
                : formatPrice(amountIncreaseBid)}
            </span>
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center mt-2 px-4 mx-auto'>
        <div className='p-2 border rounded-lg border-zinc-300 ml-12'>
          {formatPrice(initialAmount + amountIncreaseBid)}
        </div>

        <div className='border border-gray-400 p-2 font-semibold flex flex-row gap-2 rounded-lg'>
          <span>Status:</span>
          <span className='text-cyan-600'>{auctionStatus}</span>
        </div>
      </div>
      <div className='mt-5 px-4'>
        <span className='font-semibold'> Últimas ofertas</span>
      </div>
      <div className='flex flex-col mt-4 px-4'>
        {lastOffer !== undefined && <LastOfferCard item={lastOffer} />}

        {restOffers?.length > 0 && (
          <div className='flex flex-col gap-2 mt-5'>
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
            {historyBids?.length > 3 && (
              <div className='w-full flex justify-center items-center mt-1'>
                <Button variant='ghost' onClick={onOpen}>Cargar más</Button>
              </div>
            )}
          </div>
        )}
        {historyBids?.length === 0 && (
          <div className='bg-zinc-200 rounded-lg p-4 text-center'>
            <span className='text-default-500 dark:text-white text-center text-sm'>
              Aún no existen ofertas para esta subasta
            </span>
          </div>
        )}
      </div>
      <CustomModal
        titleModal={'Ultimas ofertas'}
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
              countryCode={item.user.country?.country_code.toLowerCase().trim()}
              userName={item.user.username}
              price={item.amount.toString()}
            />
          ))}
        </div>
      </CustomModal>
    </div>
  )
}

export default SocketComponent
