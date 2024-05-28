'use client'
import CustomAgents from '@/components/features/custom-agents/CustomAgents'
import { MainContainer } from '@/components/ui'
import { useGetAllAgents } from '@/hooks/api/useCustomAgents'
import React, { useMemo } from 'react'

const CustomAgentsPage = () => {
  const { data: agentsResponse, isLoading } = useGetAllAgents()
  const agents = useMemo(() => {
    const agents = agentsResponse?.data?.map((agent) => ({
      ...agent,
      id: agent.idcustoms_agent
    }))
    return agents
  }, [agentsResponse])
  return (
    <MainContainer>
      <CustomAgents agents={agents ?? []} isLoading={isLoading} />
    </MainContainer>
  )
}

export default CustomAgentsPage
