'use client'
import Lots from '@/components/features/post-management/lots/Lots'
import { MainContainer } from '@/components/ui'
import { useGetAllLots } from '@/hooks/api/useLots'
import React, { useMemo } from 'react'

const LotsPage = () => {
  const { data: lotsResponse, isLoading } = useGetAllLots()
  const lots = useMemo(() => {
    const agents = lotsResponse?.data?.map((lot) => ({
      ...lot,
      id: lot.idlot
    }))
    return agents
  }, [lotsResponse])
  return (
    <MainContainer>
      <Lots lots={lots ?? []} isLoading={isLoading} />
    </MainContainer>
  )
}

export default LotsPage
