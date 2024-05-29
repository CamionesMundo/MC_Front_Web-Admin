import { useLotFormStore } from '@/store/useLotForm'
import { type LotFullDataResponse } from '@/types/api/response/lots'
import { useCallback } from 'react'

const useLotsUtils = ({
  currentToDelete
}: {
  currentToDelete: number | undefined
}) => {
  const { selectedRows } = useLotFormStore()
  const getPublications = useCallback((data: LotFullDataResponse) => {
    const publications = data.lot.lot_queues.map((lot) => {
      const { publication } = lot
      return {
        ...publication,
        id: publication?.idpublication
      }
    })

    const idWithOrderPublications = data.lot.lot_queues.map((lot) => {
      const { publication } = lot
      const id = publication?.idpublication
      return {
        id,
        position: lot.order
      }
    })

    const idPublications = publications.map((publication) =>
      publication.idpublication?.toString()
    )
    return {
      publications,
      idPublications,
      idWithOrderPublications
    }
  }
  , [])

  const getIdAuction = useCallback(() => {
    const filtered = selectedRows.find(
      (row) => row.idpublication === currentToDelete
    )
    return filtered?.publication_code
  }, [currentToDelete, selectedRows])

  return {
    getPublications,
    getIdAuction
  }
}

export default useLotsUtils
