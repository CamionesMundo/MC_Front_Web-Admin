import { type GenericResponse } from '@/types/api'
import {
  type AuctionsDataType,
  type AuctionPublicationResponse,
  type LotFullDataResponse,
  type LotResponse
} from '@/types/api/response/lots'
import { showToast } from '../useToast'
import { LOTS_LIST_ROUTE } from '@/const/routes'
import { useCreateLot, useUpdateLot } from '../api/useLots'
import { useRouter } from 'next/navigation'
import {
  type BodyUpdateLotForm,
  type BodyLotForm,
  type BodyLotPublication
} from '@/types/api/request/lots'
import { useLotFormStore } from '@/store/useLotForm'
import {
  type QueryObserverResult,
  type RefetchOptions
} from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { type Selection, useDisclosure } from '@nextui-org/react'
import { LotStatus } from '@/types/enums'
import { type FormErrorMessages } from '@/helpers/error'

export type OrderPublication = {
  id: number
  position?: number | null
}

type useLotsActionsProps = {
  id: number
  setPage: (value: React.SetStateAction<number>) => void
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<
  QueryObserverResult<
  GenericResponse<AuctionPublicationResponse> | undefined,
  Error
  >
  >
  isEditing: boolean
  setOrderTempPublications: React.Dispatch<
  React.SetStateAction<OrderPublication[]>
  >
  setSelectedKeys: React.Dispatch<React.SetStateAction<Selection>>
  setTempSelectedKeys: React.Dispatch<React.SetStateAction<string[]>>
  totalData: AuctionsDataType[]
  filteredItems: AuctionsDataType[]
  orderTempPublications: OrderPublication[]
  notExistIdListInTotal: string[]
  tempPublications: AuctionsDataType[]
}

const useLotsActions = ({
  id,
  setPage,
  refetch,
  isEditing,
  setOrderTempPublications,
  setSelectedKeys,
  setTempSelectedKeys,
  totalData,
  filteredItems,
  orderTempPublications,
  notExistIdListInTotal,
  tempPublications
}: useLotsActionsProps) => {
  const [currentToDelete, setCurrentToDelete] = useState<number | undefined>(
    undefined
  )
  const [isClicking, setIsClicking] = useState<boolean>(false)
  const [errors, setErrors] = useState<FormErrorMessages | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const openModalDelete = (id: number) => {
    setCurrentToDelete(id)
    onOpen()
  }
  const { mutateAsync: createLot, isPending: isCreateLoading } = useCreateLot()
  const { mutateAsync: updateLot, isPending: isUpdateLoading } = useUpdateLot()
  const {
    reset,
    selectedRows,
    currentActionner,
    transmissionDate,
    updateSelectedRows
  } = useLotFormStore()
  const router = useRouter()

  const onCreateLot = async (data: BodyLotForm) => {
    await createLot(data, {
      onSuccess: (data: GenericResponse<LotResponse> | undefined) => {
        if (data?.error !== undefined) {
          showToast(data.error, 'error')
          return
        }
        showToast(data?.message ?? '', 'success')
        router.push(LOTS_LIST_ROUTE)
        setTimeout(() => {
          reset()
        }, 400)
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }

  const onUpdateLot = async (data: BodyLotForm) => {
    const body: BodyUpdateLotForm = {
      id: Number(id),
      data
    }

    await updateLot(body, {
      onSuccess: async (
        data: GenericResponse<LotFullDataResponse> | undefined
      ) => {
        if (data?.error !== undefined) {
          showToast(data.error, 'error')
          return
        }
        setPage(1)
        await refetch()

        showToast(data?.message ?? '', 'success')
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }

  const onDelete = async () => {
    deleteItemSelected(undefined)

    const filtered = selectedRows.filter(
      (row) => row.idpublication !== currentToDelete
    )
    const selectedPublications: BodyLotPublication[] = filtered.map(
      (row, index) => ({
        idpublication: row.idpublication,
        order: index + 1,
        status: true
      })
    )
    const dataBody: BodyLotForm = {
      actionner: currentActionner?.iduser_admin ?? 0,
      active: true,
      status: LotStatus.Active,
      streaming_url: null,
      transmission_date: transmissionDate,
      publications: selectedPublications
    }
    const body: BodyUpdateLotForm = {
      id: Number(id),
      data: dataBody
    }
    await updateLot(body, {
      onSuccess: async (
        data: GenericResponse<LotFullDataResponse> | undefined
      ) => {
        if (data?.error !== undefined) {
          showToast(data.error, 'error')
          return
        }
        setPage(1)
        await refetch()
        showToast(data?.message ?? '', 'success')
        onClose()
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }

  const deleteItemSelected = useCallback(
    (id: number | undefined) => {
      const idToCompare = isEditing ? currentToDelete : id
      setOrderTempPublications((prev) => {
        const orderedTemp = prev
        const indexToDelete = orderedTemp.findIndex(
          (item) => item.id === idToCompare
        )
        if (indexToDelete === -1) return prev
        orderedTemp.splice(indexToDelete, 1)
        const newData = orderedTemp.map((item, index) => ({
          ...item,
          position: index + 1
        }))
        return [...newData]
      })

      const filtered = selectedRows.filter(
        (row) => row.idpublication !== idToCompare
      )

      const idPublications = filtered.map((publication) =>
        publication.idpublication.toString()
      )

      setSelectedKeys(new Set(idPublications))
      setTempSelectedKeys(idPublications)
      updateSelectedRows(filtered)
      setIsClicking(true)
    },
    [
      selectedRows,
      updateSelectedRows,
      currentToDelete,
      isEditing,
      setIsClicking,
      setOrderTempPublications,
      setTempSelectedKeys,
      setSelectedKeys
    ]
  )

  const handleSelectionOnEdit = useCallback(
    (keys: Selection) => {
      setSelectedKeys(keys)
      let selectedRowsData: AuctionsDataType[] = []
      if (keys === 'all') {
        if (totalData !== undefined) {
          selectedRowsData = totalData
        } else {
          selectedRowsData = filteredItems
        }
      } else {
        if (totalData !== undefined) {
          selectedRowsData = Array.from(keys).map((key) =>
            totalData.find((item) => item.id === Number(key))
          ) as AuctionsDataType[]
        } else {
          selectedRowsData = Array.from(keys).map((key) =>
            filteredItems.find((item) => item.id === Number(key))
          ) as AuctionsDataType[]
        }
      }

      const newSelection = selectedRowsData.map((item) =>
        item.idpublication.toString()
      )

      const tempIdPublications = orderTempPublications.map((obj) => obj.id)
      const ordered = newSelection.map((id) => {
        if (!tempIdPublications.includes(parseInt(id))) {
          tempIdPublications.push(parseInt(id))
        }
        return id
      })

      const lastIdSelected = ordered.pop()

      const last = selectedRowsData

      const lastSelected = last.pop()

      setOrderTempPublications((prev) => [
        ...prev,
        { id: Number(lastIdSelected), position: prev.length + 1 }
      ])
      const restNotExistPublications = notExistIdListInTotal
        .map((key) => {
          const found = tempPublications.find(
            (item) => item.idpublication === Number(key)
          )
          return found
        })
        .filter((item): item is AuctionsDataType => item !== undefined)

      const currentPublications = [
        ...selectedRowsData,
        ...(restNotExistPublications.length > 0
          ? restNotExistPublications
          : []),
        ...(lastSelected !== undefined ? [lastSelected] : [])
      ]

      const currentIdsPublications = currentPublications.map((item) =>
        item.idpublication.toString()
      )

      const existIdsPublications = currentIdsPublications.filter((id) =>
        tempIdPublications.includes(parseInt(id))
      )

      const orderedIdPublications = existIdsPublications.sort((a, b) => {
        return (
          tempIdPublications.indexOf(parseInt(a)) -
          tempIdPublications.indexOf(parseInt(b))
        )
      })
      const existPublications = currentPublications.filter((pub) =>
        tempIdPublications.includes(parseInt(pub.idpublication.toString()))
      )
      const orderedPublications = existPublications.sort((a, b) => {
        return (
          tempIdPublications.indexOf(parseInt(a.idpublication.toString())) -
          tempIdPublications.indexOf(parseInt(b.idpublication.toString()))
        )
      })

      updateSelectedRows(orderedPublications)
      setTempSelectedKeys(orderedIdPublications)
      setIsClicking(true)
    },
    [
      filteredItems,
      totalData,
      updateSelectedRows,
      notExistIdListInTotal,
      tempPublications,
      orderTempPublications,
      setIsClicking,
      setOrderTempPublications,
      setSelectedKeys,
      setTempSelectedKeys
    ]
  )

  const handleSelection = useCallback(
    (keys: Selection) => {
      setSelectedKeys(keys)
      let selectedRowsData: AuctionsDataType[] = []
      if (keys === 'all') {
        if (totalData !== undefined) {
          selectedRowsData = totalData
        } else {
          selectedRowsData = filteredItems
        }
      } else if (Array.isArray(keys)) {
        if (totalData !== undefined) {
          selectedRowsData = keys.map((key) =>
            totalData.find((item) => item.id === Number(key))
          ) as AuctionsDataType[]
        } else {
          selectedRowsData = keys.map((key) =>
            filteredItems.find((item) => item.id === Number(key))
          ) as AuctionsDataType[]
        }
      } else if (keys instanceof Set) {
        if (totalData !== undefined) {
          selectedRowsData = Array.from(keys).map((key) =>
            totalData.find((item) => item.id === Number(key))
          ) as AuctionsDataType[]
        } else {
          selectedRowsData = Array.from(keys).map((key) =>
            filteredItems.find((item) => item.id === Number(key))
          ) as AuctionsDataType[]
        }
      }
      updateSelectedRows(selectedRowsData)
    },
    [filteredItems, totalData, updateSelectedRows, setSelectedKeys]
  )

  const handleSubmit = async () => {
    setErrors(null)
    if (transmissionDate === '') {
      setErrors({ transmissionDate: 'Debes seleccionar una fecha' })
      showToast('Datos incompletos', 'warning')
      return
    }
    if (currentActionner === undefined) {
      setErrors({ currentActionner: 'Debes seleccionar un Martillero' })
      showToast('Datos incompletos', 'warning')
      return
    }
    if (selectedRows.length === 0) {
      setErrors({ selectedRows: 'Debes elegir un vehículo' })
      showToast('Datos incompletos', 'warning')
      setTimeout(() => {
        showToast('Debes elegir al menos un vehículo', 'error')
      }, 1500)
      return
    }

    const selectedPublications: BodyLotPublication[] = selectedRows.map(
      (row, index) => ({
        idpublication: row.idpublication,
        order: index + 1,
        status: true
      })
    )

    const dataBody: BodyLotForm = {
      actionner: currentActionner?.iduser_admin ?? 0,
      active: true,
      status: LotStatus.Active,
      streaming_url: null,
      transmission_date: transmissionDate,
      publications: selectedPublications
    }

    if (isEditing) {
      await onUpdateLot(dataBody)
    } else {
      await onCreateLot(dataBody)
    }
  }

  return {
    isCreateLoading,
    isUpdateLoading,
    onDelete,
    openModalDelete,
    currentToDelete,
    isOpen,
    onClose,
    deleteItemSelected,
    handleSelectionOnEdit,
    isClicking,
    handleSelection,
    handleSubmit,
    errors
  }
}

export default useLotsActions
