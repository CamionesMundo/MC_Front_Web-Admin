import { useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import {
  useCancelOrder,
  useGetOrderById,
  useUpdateOrder
} from '../api/useOrders'
import { useGetAppUserById } from '../api/useClients'
import { useGetPublicationById } from '../api/usePublications'
import { type CustomAgentsResponse } from '@/types/api'
import {
  type Key,
  useCallback,
  useMemo,
  useState,
  useEffect,
  type ReactNode
} from 'react'
import { showToast } from '../useToast'
import { type RequestDeleteOrder } from '@/types/api/request/order'
import { OrderStatusType } from '@/types/enums'

type Props = {
  id: string
  getAccountType: (accountType: string) => ReactNode
}
const useOrderDetail = ({ id, getAccountType }: Props) => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { mutateAsync: updateOrder, isPending } = useUpdateOrder()
  const { mutateAsync: cancelOrder, isPending: isPendingCancel } =
    useCancelOrder()
  const {
    isOpen: isOpenSeller,
    onOpen: onOpenSeller,
    onClose: onCloseSeller
  } = useDisclosure()

  const {
    isOpen: isOpenCancelModal,
    onOpen: onOpenCancelModal,
    onClose: onCloseCancelModal
  } = useDisclosure()
  const { data: detailResponse, isLoading } = useGetOrderById(Number(id))
  const { data: buyerResponse, isLoading: isLoadingBuyerInfo } =
    useGetAppUserById(Number(detailResponse?.data.iduser_buyer))

  const { data: sellerResponse, isLoading: isLoadingSellerInfo } =
    useGetAppUserById(Number(detailResponse?.data.publication.iduser))
  const { data: publicationResponse } = useGetPublicationById(
    Number(detailResponse?.data.idpublication)
  )

  const [currentAgentBuyer, setCurrentAgentBuyer] = useState<
  CustomAgentsResponse | undefined
  >(undefined)

  const [currentAgentSeller, setCurrentAgentSeller] = useState<
  CustomAgentsResponse | undefined
  >(undefined)

  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selected, setSelected] = useState('description')
  const [isEditAgent, setIsEditAgent] = useState(false)
  const [reason, setReason] = useState<string | null>(null)

  /* The `handleChangeCustomAgentBuyer` function is a callback function created using the `useCallback`
  hook in React. It takes a parameter `customAgent` of type `CustomAgentsResponse` or `undefined`.
  When this function is called, it sets the state of `currentAgentBuyer` using the
  `setCurrentAgentBuyer` function with the value of the `customAgent` parameter passed to it. */
  const handleChangeCustomAgentBuyer = useCallback(
    (customAgent: CustomAgentsResponse | undefined) => {
      setCurrentAgentBuyer(customAgent)
    },
    []
  )

  /* The `handleChangeCustomAgentSeller` constant is a callback function created using the
  `useCallback` hook in React. This function takes a parameter `customAgent` of type
  `CustomAgentsResponse` or `undefined`. */
  const handleChangeCustomAgentSeller = useCallback(
    (customAgent: CustomAgentsResponse | undefined) => {
      setCurrentAgentSeller(customAgent)
    },
    []
  )

  /* The `handleSelectionChange` function takes a parameter `key` of type `Key`. Inside the function,
  it first checks if the `key` is of type `string` using the `typeof` operator. If the `key` is
  indeed a string, it then calls the `setSelected` function with the `key` parameter passed to it.
  This function is essentially updating the `selected` state with the value of the `key` only if
  the `key` is a string. */
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
  }, [buyerInfo, getAccountType])

  const typeSellerAccount = useMemo(() => {
    const typeAccount = getAccountType(
      sellerInfo?.firebase_uid?.uid_reference ?? ''
    )
    return typeAccount
  }, [sellerInfo, getAccountType])

  const publication = useMemo(() => {
    if (publicationResponse !== undefined) {
      return publicationResponse.data
    }
    return undefined
  }, [publicationResponse])

  const handleReady = () => {
    setIsReady(true)
  }

  const onEditBuyer = () => {
    router.push(`/users-management/clients/edit/id/${buyerInfo?.iduser}`)
  }

  const onEditSeller = () => {
    router.push(`/users-management/clients/edit/id/${sellerInfo?.iduser}`)
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

  useEffect(() => {
    if (detailResponse !== undefined || isEditAgent) {
      const agent = detailResponse?.data.customsAgent
      const sellerAgent = detailResponse?.data.customs_agent_port_origin
      if (agent !== undefined && agent !== null) {
        handleChangeCustomAgentBuyer(agent)
      }
      if (sellerAgent !== undefined && sellerAgent !== null) {
        handleChangeCustomAgentSeller(sellerAgent)
      }
    }
  }, [
    detailResponse,
    handleChangeCustomAgentBuyer,
    handleChangeCustomAgentSeller,
    isEditAgent
  ])

  /**
   * The function `handleOpenEditAgentBuyer` sets a state variable to true and then calls another
   * function.
   */
  const handleOpenEditAgentBuyer = () => {
    setIsEditAgent(true)
    onOpen()
  }

  /**
   * The function `handleOpenEditAgentSeller` sets a state variable to true and then calls another
   * function.
   */
  const handleOpenEditAgentSeller = () => {
    setIsEditAgent(true)
    onOpenSeller()
  }

  /**
   * The function handleCloseEditAgentBuyer closes the edit mode, resets the state for editing agent
   * buyer, and clears the current agent buyer data.
   */
  const handleCloseEditAgentBuyer = () => {
    onClose()
    setIsEditAgent(false)
    setCurrentAgentBuyer(undefined)
  }

  /**
   * The function handleCloseEditAgentSeller closes the edit mode for an agent seller and resets the
   * current agent seller.
   */
  const handleCloseEditAgentSeller = () => {
    onCloseSeller()
    setIsEditAgent(false)
    setCurrentAgentSeller(undefined)
  }

  /* This `handleUpdateBuyerAgent` function is a callback function created using the `useCallback` hook
  in React. It is responsible for updating the buyer's agent in an order. Here's a breakdown of what
  it does: */
  const handleUpdateBuyerAgent = useCallback(async () => {
    if (currentAgentBuyer === undefined) {
      showToast('Debe seleccionar un agente aduanero', 'warning')
      return
    }
    const body = {
      id: Number(id),
      body: {
        idcustoms_agent: currentAgentBuyer?.idcustoms_agent
      }
    }
    await updateOrder(body, {
      onSuccess: async (data) => {
        showToast(data?.message ?? '', 'success')
        onClose()
        setCurrentAgentBuyer(undefined)
        setIsEditAgent(false)
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }, [currentAgentBuyer, updateOrder, id, onClose])

  /* The `handleUpdateSellerAgent` function is a callback function that is created using the
  `useCallback` hook in React. This function is responsible for updating the seller's agent in an
  order. Here's a breakdown of what it does: */
  const handleUpdateSellerAgent = useCallback(async () => {
    if (currentAgentSeller === undefined) {
      showToast('Debe seleccionar un agente aduanero', 'warning')
      return
    }
    const body = {
      id: Number(id),
      body: {
        idcustoms_agent_port_origin: currentAgentSeller?.idcustoms_agent
      }
    }
    await updateOrder(body, {
      onSuccess: async (data) => {
        showToast(data?.message ?? '', 'success')
        onCloseSeller()
        setCurrentAgentSeller(undefined)
        setIsEditAgent(false)
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }, [currentAgentSeller, updateOrder, id, onCloseSeller])

  /* The above code is a TypeScript function using the `useCallback` hook. It is defining a function
  `onCancelOrder` that is used to cancel an order. */
  const onCancelOrder = useCallback(async () => {
    if (reason === null) {
      showToast(
        'Debes colocar un motivo de cancelación de orden de venta',
        'warning'
      )
      return
    }

    if (reason !== null && reason?.trim().length < 10) {
      showToast(
        'Debes colocar un motivo de cancelación de orden de venta',
        'warning'
      )
      return
    }

    const data: RequestDeleteOrder = {
      id: Number(id),
      body: {
        reason: reason ?? ''
      }
    }
    await cancelOrder(data, {
      onSuccess: async (data) => {
        showToast(data?.message ?? '', 'success')
        onCloseCancelModal()
        setReason(null)
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }, [id, reason, cancelOrder, onCloseCancelModal])

  const finished = useMemo(() => {
    const filtered = order?.history.find(
      (item) => item.idorder_status === OrderStatusType.Finished
    )
    return filtered
  }, [order])

  return {
    isReady,
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
    setIsEditAgent,
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
    onClose,
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
    currentAgentSeller,
    finished
  }
}

export default useOrderDetail
