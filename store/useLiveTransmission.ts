import {
  type BidSocket,
  type LotQueueDataType
} from '@/types/api/response/lots'
import { type PublicationResponse } from '@/types/api/response/publication'
import { create } from 'zustand'

export type LotCurrentData = {
  currentIdLot: number
  totalQueue: LotQueueDataType[]
  currentLot: LotQueueDataType | undefined
  nextLotId: number | undefined
  awaitingQueue: LotQueueDataType[]
  isLast: boolean
  currentAuctionId: number | undefined
  currentIdQueue: number | undefined
  isLoadingNextButton: boolean
}

export type AuctionLotCurrentData = {
  totalCount: number
  count: number
  secondsPercent: number
  initCountdown: boolean
  hasWinner: boolean
  isAuctionFinished: boolean
  emitToastFinished: boolean
  currentBid: BidSocket | undefined
  isPlaying: boolean
  percentPeerSecond: number
}

export type PublicationCurrentData = {
  publication: PublicationResponse | undefined
  principalVideoUrl: string
  imagesGallery: ImagesUrl[]
  giftsGallery: ImagesUrl[]
}

export type DataToEmit = {
  auctionId: number
  seconds: number
}

type ImagesUrl = {
  original: string
}

const initialLotState: LotCurrentData = {
  currentIdLot: 0,
  totalQueue: [],
  currentLot: undefined,
  nextLotId: undefined,
  awaitingQueue: [],
  isLast: false,
  currentAuctionId: undefined,
  currentIdQueue: undefined,
  isLoadingNextButton: false
}

const initialAuctionLotState: AuctionLotCurrentData = {
  totalCount: 0,
  count: 0,
  secondsPercent: 100,
  initCountdown: false,
  hasWinner: false,
  isAuctionFinished: false,
  emitToastFinished: false,
  currentBid: undefined,
  isPlaying: false,
  percentPeerSecond: 0
}

const initialPublicationState: PublicationCurrentData = {
  publication: undefined,
  principalVideoUrl: '',
  imagesGallery: [],
  giftsGallery: []
}

interface LotActions {
  updateCurrentIdLot: (id: number) => void
  updateTotalQueue: (queue: LotQueueDataType[]) => void
  updateCurrentLot: (lot: LotQueueDataType | undefined) => void
  updateNextLotId: (id: number | undefined) => void
  updateAwaitingQueue: (queue: LotQueueDataType[]) => void
  updateIsLast: (isLast: boolean) => void
  updateCurrentAuctionId: (id: number | undefined) => void
  updateCurrentIdQueue: (id: number | undefined) => void
  updateIsLoadingNextButton: (value: boolean) => void
  reset: () => void
}

interface PublicationLotActions {
  updatePublication: (item: PublicationResponse | undefined) => void
  updatePrincipalVideo: (url: string) => void
  updateImagesGallery: (images: ImagesUrl[]) => void
  updateGiftsGallery: (gifts: ImagesUrl[]) => void
}

interface AuctionLotActions {
  updateTotalCount: (total: number) => void
  updateCount: (value: number) => void
  updateSecondsPercent: (percent: number) => void
  updateInitCountDown: (value: boolean) => void
  updateHasWinner: (value: boolean) => void
  updateIsAuctionFinished: (value: boolean) => void
  updateEmitToastFinished: (value: boolean) => void
  updateCurrentBid: (bid: BidSocket | undefined) => void
  updateIsPlaying: (value: boolean) => void
  updatePercentPeerSecond: (percent: number) => void
  decrementCount: () => void
}

export const useLiveTransmissionStore = create<
LotCurrentData &
PublicationCurrentData &
AuctionLotCurrentData &
LotActions &
PublicationLotActions &
AuctionLotActions
>((set) => ({
  ...initialLotState,
  ...initialPublicationState,
  ...initialAuctionLotState,
  updateCurrentIdLot: (id) => {
    set((state) => ({ ...state, currentIdLot: id }))
  },
  updateTotalQueue: (queue) => {
    set((state) => ({ ...state, totalQueue: queue }))
  },
  updateCurrentLot: (lot) => {
    set((state) => ({ ...state, currentLot: lot }))
  },
  updateNextLotId: (id) => {
    set((state) => ({ ...state, nextLotId: id }))
  },
  updateAwaitingQueue: (queue) => {
    set((state) => ({ ...state, awaitingQueue: queue }))
  },
  updateIsLast: (isLast) => {
    set((state) => ({ ...state, isLast }))
  },
  updateCurrentAuctionId: (id) => {
    set((state) => ({ ...state, currentAuctionId: id }))
  },
  updateCurrentIdQueue: (id) => {
    set((state) => ({ ...state, currentIdQueue: id }))
  },
  updateIsLoadingNextButton: (value) => {
    set((state) => ({ ...state, isLoadingNextButton: value }))
  },
  reset: () => {
    set({ ...initialLotState, ...initialPublicationState, ...initialAuctionLotState })
  },
  updatePublication: (item) => {
    set((state) => ({ ...state, publication: item }))
  },
  updatePrincipalVideo: (url) => {
    set((state) => ({ ...state, principalVideoUrl: url }))
  },
  updateImagesGallery: (images) => {
    set((state) => ({ ...state, imagesGallery: images }))
  },
  updateGiftsGallery: (gifts) => {
    set((state) => ({ ...state, giftsGallery: gifts }))
  },
  updateTotalCount: (total: number) => {
    set((state) => ({ ...state, totalCount: total }))
  },
  updateCount: (value: number) => {
    set((state) => ({ ...state, count: value }))
  },
  updateSecondsPercent: (percent: number) => {
    set((state) => ({ ...state, secondsPercent: percent }))
  },
  updateInitCountDown: (value: boolean) => {
    set((state) => ({ ...state, initCountdown: value }))
  },
  updateHasWinner: (value: boolean) => {
    set((state) => ({ ...state, hasWinner: value }))
  },
  updateIsAuctionFinished: (value: boolean) => {
    set((state) => ({ ...state, isAuctionFinished: value }))
  },
  updateEmitToastFinished: (value: boolean) => {
    set((state) => ({ ...state, emitToastFinished: value }))
  },
  updateCurrentBid: (bid: BidSocket | undefined) => {
    set((state) => ({ ...state, currentBid: bid }))
  },
  updateIsPlaying: (value: boolean) => {
    set((state) => ({ ...state, isPlaying: value }))
  },
  updatePercentPeerSecond: (percent: number) => {
    set((state) => ({ ...state, percentPeerSecond: percent }))
  },
  decrementCount: () => {
    set((state) => {
      const newCount = state.count > 0 ? state.count - 1 : 0
      const newSecondsPercent =
        state.secondsPercent > 0
          ? state.secondsPercent - state.percentPeerSecond
          : 0
      return {
        ...state,
        count: newCount,
        secondsPercent: newSecondsPercent
      }
    })
  }
}))
