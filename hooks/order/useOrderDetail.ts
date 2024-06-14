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

  const handleChangeCustomAgentBuyer = useCallback(
    (customAgent: CustomAgentsResponse | undefined) => {
      setCurrentAgentBuyer(customAgent)
    },
    []
  )
  const handleChangeCustomAgentSeller = useCallback(
    (customAgent: CustomAgentsResponse | undefined) => {
      setCurrentAgentSeller(customAgent)
    },
    []
  )

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

  const handleOpenEditAgentBuyer = () => {
    setIsEditAgent(true)
    onOpen()
  }
  const handleOpenEditAgentSeller = () => {
    setIsEditAgent(true)
    onOpenSeller()
  }

  const handleCloseEditAgentBuyer = () => {
    onClose()
    setIsEditAgent(false)
    setCurrentAgentBuyer(undefined)
  }
  const handleCloseEditAgentSeller = () => {
    onCloseSeller()
    setIsEditAgent(false)
    setCurrentAgentSeller(undefined)
  }

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
    currentAgentSeller
  }
}

export default useOrderDetail
