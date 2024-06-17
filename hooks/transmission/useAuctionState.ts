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

  /* This `useEffect` hook is responsible for updating the auction state based on the parameters
  received from the API response. Here's a breakdown of what it does: */
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

  /* This `useEffect` hook is responsible for managing the countdown timer during the auction. Here's a
  breakdown of what it does: */
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

  /* This `useEffect` hook is responsible for updating the count and seconds percent when a new
  `currentBid` is received. Here's a breakdown of what it does: */
  useEffect(() => {
    if (currentBid !== undefined) {
      updateCount(totalCount)
      updateSecondsPercent(100)
    }
  }, [currentBid, totalCount, updateCount, updateSecondsPercent])

  /* This `useEffect` hook is responsible for updating the state to emit a toast notification when the
  auction is finished. It runs whenever the `isAuctionFinished` state changes or the
  `updateEmitToastFinished` function reference changes. */
  useEffect(() => {
    if (isAuctionFinished) {
      updateEmitToastFinished(true)
    }
  }, [isAuctionFinished, updateEmitToastFinished])

  return {
    isLoadingParameters
  }
}
