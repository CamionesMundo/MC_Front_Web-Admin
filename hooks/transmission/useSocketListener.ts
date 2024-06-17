import {
  type QueryObserverResult,
  type RefetchOptions,
  useQueryClient
} from '@tanstack/react-query'
import useSocket from '../socket/useSocket'
import { useRouter } from 'next/navigation'
import {
  type DataToEmit,
  useLiveTransmissionStore
} from '@/store/useLiveTransmission'
import { useEffect } from 'react'
import {
  type AuctionEndResponse,
  type BidSocket
} from '@/types/api/response/lots'
import { showToast } from '../useToast'
import { type GenericResponse } from '@/types/api'
import { type PublicationResponse } from '@/types/api/response/publication'
import { TypeAuctionStatus } from '@/types/enums'

type Props = {
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<
  QueryObserverResult<GenericResponse<PublicationResponse> | undefined, Error>
  >
}

export const useSocketListeners = ({ refetch }: Props) => {
  const socket = useSocket()
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    updateCurrentBid,
    initCountdown,
    count,
    emitToastFinished,
    publication,
    currentAuctionId,
    updateIsAuctionFinished,
    updateHasWinner
  } = useLiveTransmissionStore()

  /* This `useEffect` hook is responsible for emitting a socket event called 'auctionTimerUpdate' under
  certain conditions. It checks if the `socket` is not null, `initCountdown` is true, `count` is
  greater than or equal to 0, and `emitToastFinished` is false. If all these conditions are met, it
  creates an object `data` of type `DataToEmit` with the auction ID and the current count of
  seconds. Then, it emits this data object to the socket with the event name 'auctionTimerUpdate'. */
  useEffect(() => {
    if (
      socket !== null &&
      initCountdown &&
      count >= 0 &&
      !emitToastFinished
    ) {
      const data: DataToEmit = {
        auctionId: publication?.auction.idauctions ?? 0,
        seconds: count
      }
      socket?.emit('auctionTimerUpdate', data)
    }
  }, [
    initCountdown,
    socket,
    count,
    publication?.auction.idauctions,
    emitToastFinished
  ])

  /* This `useEffect` hook is setting up a listener for the 'bidPlaced' event on the `socket`
  connection. It checks if the `socket` is not `undefined` and if the auction status is
  'InProgress'. If these conditions are met, it defines a function `handleBidPlaced` that will be
  called when the 'bidPlaced' event is received. */
  useEffect(() => {
    if (socket !== undefined && publication?.auction.type_status.type_name === TypeAuctionStatus.InProgress) {
      const handleBidPlaced = async (args: BidSocket) => {
        if (currentAuctionId === args.auctionId) {
          updateCurrentBid(args)

          await queryClient.invalidateQueries({
            queryKey: ['publicationBids', { id: publication?.idpublication }]
          })
          router.refresh()
        }
      }

      socket?.on('bidPlaced', handleBidPlaced)

      return () => {
        socket?.off('bidPlaced', handleBidPlaced)
      }
    }
  }, [
    socket,
    currentAuctionId,
    queryClient,
    publication?.idpublication,
    router,
    updateCurrentBid,
    publication
  ])

  /* This `useEffect` hook is responsible for handling the logic related to the end of an auction.
  Here's a breakdown of what it does: */
  useEffect(() => {
    const handleAuctionEnd = () => {
      if (initCountdown && count === 0 && !emitToastFinished) {
        socket?.emit('auctionAuctioneerEnd', { auctionId: currentAuctionId })

        const handleRespAuctionAuctioneerEnd = async (
          args: AuctionEndResponse
        ) => {
          showToast(args.message, 'success')

          await refetch()
            .then()
            .catch((error) => {
              console.error('Error during refetch:', error)
            })
          await queryClient.invalidateQueries({
            queryKey: ['publicationBids', { id: publication?.idpublication }]
          })
          updateIsAuctionFinished(true)
          updateHasWinner(
            args.winner_id !== null && args.auctionId === currentAuctionId
          )
          router.refresh()
        }

        socket?.on('respAuctionAuctioneerEnd', handleRespAuctionAuctioneerEnd)

        return () => {
          socket?.off(
            'respAuctionAuctioneerEnd',
            handleRespAuctionAuctioneerEnd
          )
        }
      }
    }

    handleAuctionEnd()
  }, [
    initCountdown,
    count,
    socket,
    currentAuctionId,
    refetch,
    emitToastFinished,
    router,
    queryClient,
    publication?.idpublication,
    updateIsAuctionFinished,
    updateHasWinner
  ])

  return { socket }
}
