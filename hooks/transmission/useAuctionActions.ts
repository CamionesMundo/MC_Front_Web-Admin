import { useRouter } from 'next/navigation'
import {
  useDeleteQueueById,
  useFinishedLot,
  useNextAuction,
  useSendToEndAuction,
  useStartAuction
} from '../api/useLots'
import { useLiveTransmissionStore } from '@/store/useLiveTransmission'
import { useCallback } from 'react'
import { TypeAuctionStatus } from '@/types/enums'
import { showToast } from '../useToast'
import { type Socket } from 'socket.io-client'
import {
  type QueryObserverResult,
  type RefetchOptions
} from '@tanstack/react-query'
import { type GenericResponse } from '@/types/api'
import { type PublicationResponse } from '@/types/api/response/publication'
import { type LotQueueResponse } from '@/types/api/response/lots'
import { LOTS_LIST_ROUTE } from '@/const/routes'

type Props = {
  socket: Socket | null
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<
  QueryObserverResult<GenericResponse<PublicationResponse> | undefined, Error>
  >
}

export const useAuctionActions = ({ socket, refetch }: Props) => {
  const router = useRouter()
  const {
    isLast,
    currentIdLot,
    currentIdQueue,
    publication,
    initCountdown,
    isLoadingNextButton,
    currentAuctionId,
    nextLotId,
    totalCount,
    updateInitCountDown,
    updateIsLoadingNextButton,
    updateCount,
    updateSecondsPercent,
    updateEmitToastFinished,
    updateIsAuctionFinished,
    reset
  } = useLiveTransmissionStore()
  const { mutateAsync: startAuction, isPending: isPendingStart } =
    useStartAuction()
  const { mutateAsync: unlinkLotQueue, isPending: isLoadingDelete } =
    useDeleteQueueById(currentIdLot ?? 0, currentIdQueue ?? 0)
  const { mutateAsync: goToNextLot } = useNextAuction()
  const { mutateAsync: sendToEndAuction } = useSendToEndAuction()
  const { mutateAsync: changeStatusLot, isPending: isLoadingFinishedLot } =
    useFinishedLot()

  const status = publication?.auction.type_status.type_name

  const disabledNextButton =
    (status !== TypeAuctionStatus.Awarded &&
      status !== TypeAuctionStatus.NoBidder) ||
    !initCountdown ||
    isLoadingNextButton

  const disabledInitAuctionButton =
    status === TypeAuctionStatus.Awarded || isPendingStart || initCountdown

  const disableUnlinkButton =
    isLast ||
    isPendingStart ||
    isLoadingDelete ||
    status === TypeAuctionStatus.InProgress ||
    status === TypeAuctionStatus.Awarded ||
    isLoadingNextButton

  const handleInitAuction = useCallback(async () => {
    if (disabledInitAuctionButton) {
      showToast('La subasta ha finalizado', 'warning')
      return
    }
    await startAuction(currentIdQueue ?? 0, {
      onSuccess: (data) => {
        showToast(data?.message ?? '', 'success')
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
    socket?.emit('auctionAuctioneerStart', { auctionId: currentAuctionId })
    await refetch()
    updateInitCountDown(true)
  }, [
    currentIdQueue,
    startAuction,
    currentAuctionId,
    socket,
    disabledInitAuctionButton,
    refetch,
    updateInitCountDown
  ])

  const handleNextAuction = useCallback(async () => {
    if (
      status !== TypeAuctionStatus.NoBidder &&
      status !== TypeAuctionStatus.Awarded
    ) {
      showToast('Se esta cerrando la subasta...', 'warning')
      return
    }

    updateIsLoadingNextButton(true)
    await goToNextLot(nextLotId ?? 0, {
      onSuccess: (data: GenericResponse<LotQueueResponse> | undefined) => {
        if (data?.error !== undefined) {
          showToast(data.error, 'error')
          return
        }
        socket?.emit('lotUpdate', { idLot: currentIdLot })
        showToast(data?.message ?? '', 'success')
        updateCount(totalCount)
        updateSecondsPercent(100)
        updateInitCountDown(false)
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
        updateIsLoadingNextButton(false)
      }
    })
    if (status === TypeAuctionStatus.NoBidder) {
      await sendToEndAuction(currentIdQueue ?? 0, {
        onSuccess: async (
          data: GenericResponse<LotQueueResponse> | undefined
        ) => {
          if (data?.error !== undefined) {
            showToast(data.error, 'error')
            return
          }
          showToast(data?.message ?? '', 'success')
          updateCount(totalCount)
          updateSecondsPercent(100)
          updateInitCountDown(false)
        },
        onError: (data: Error) => {
          showToast(data.message, 'error')
          updateIsLoadingNextButton(false)
        }
      })
    }
    updateEmitToastFinished(false)
    updateIsLoadingNextButton(false)
    updateIsAuctionFinished(false)
  }, [
    goToNextLot,
    nextLotId,
    totalCount,
    status,
    sendToEndAuction,
    currentIdQueue,
    currentIdLot,
    socket,
    updateCount,
    updateEmitToastFinished,
    updateInitCountDown,
    updateIsLoadingNextButton,
    updateSecondsPercent,
    updateIsAuctionFinished
  ])

  const handleUnlinkAuction = useCallback(async () => {
    await unlinkLotQueue(currentIdQueue ?? 0, {
      onSuccess: async (data) => {
        showToast(data?.message ?? '', 'success')
        await goToNextLot(nextLotId ?? 0, {
          onSuccess: (data: GenericResponse<LotQueueResponse> | undefined) => {
            if (data?.error !== undefined) {
              showToast(data.error, 'error')
              return
            }
            socket?.emit('lotUpdate', { idLot: currentIdLot })
            showToast(data?.message ?? '', 'success')
            updateCount(totalCount)
            updateSecondsPercent(100)
            updateInitCountDown(false)
            router.refresh()
          },
          onError: (data: Error) => {
            showToast(data.message, 'error')
            updateIsLoadingNextButton(false)
          }
        })
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }, [
    currentIdQueue,
    unlinkLotQueue,
    router,
    totalCount,
    goToNextLot,
    currentIdLot,
    nextLotId,
    socket,
    updateCount,
    updateInitCountDown,
    updateIsLoadingNextButton,
    updateSecondsPercent
  ])

  const handleFinishedLot = useCallback(async () => {
    await changeStatusLot(currentIdLot, {
      onSuccess: (data) => {
        showToast(data?.message ?? '', 'success')
        socket?.emit('lotEnd', { idLot: currentIdLot })
        router.push(LOTS_LIST_ROUTE)
        setTimeout(() => {
          reset()
        }, 400)
      },
      onError: (data: Error) => {
        showToast(data?.message ?? '', 'error')
      }
    })
  }, [changeStatusLot, currentIdLot, router, socket, reset])

  return {
    disabledInitAuctionButton,
    disableUnlinkButton,
    disabledNextButton,
    handleInitAuction,
    handleNextAuction,
    handleUnlinkAuction,
    handleFinishedLot,
    isPendingStart,
    isLoadingDelete,
    isLoadingFinishedLot
  }
}
