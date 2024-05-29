import { useLiveTransmissionStore } from '@/store/useLiveTransmission'
import { useGetAllParameters } from '../api/useAppConfig'
import { useEffect } from 'react'
import { AppParametersType } from '@/types/enums'

export const useAuctionState = () => {
  const { data: responseParameters, isLoading: isLoadingParameters } =
    useGetAllParameters()

  const {
    initCountdown,
    updateTotalCount,
    updateCount,
    totalCount,
    decrementCount,
    updatePercentPeerSecond,
    updateSecondsPercent,
    currentBid,
    isAuctionFinished,
    updateEmitToastFinished
  } = useLiveTransmissionStore()

  useEffect(() => {
    if (responseParameters !== undefined && !initCountdown) {
      const data = responseParameters.data?.find(
        (data) => data.idparameter === AppParametersType.TimeBetweenBids
      )
      const value = parseInt(data?.value ?? '0')
      updateTotalCount(value)
      updateCount(value)
      updatePercentPeerSecond(100 / value)
    }
  }, [
    initCountdown,
    updateTotalCount,
    updateCount,
    responseParameters,
    updatePercentPeerSecond
  ])

  useEffect(() => {
    if (totalCount === 0 && isAuctionFinished) return
    let timer: NodeJS.Timeout

    if (initCountdown && !isAuctionFinished) {
      timer = setInterval(() => {
        decrementCount()
      }, 1000)
    }
    return () => {
      if (timer !== undefined) {
        clearInterval(timer)
      }
    }
  }, [initCountdown, totalCount, decrementCount, isAuctionFinished])

  useEffect(() => {
    if (currentBid !== undefined) {
      updateCount(totalCount)
      updateSecondsPercent(100)
    }
  }, [currentBid, totalCount, updateCount, updateSecondsPercent])

  useEffect(() => {
    if (isAuctionFinished) {
      updateEmitToastFinished(true)
    }
  }, [isAuctionFinished, updateEmitToastFinished])

  return {
    isLoadingParameters
  }
}
