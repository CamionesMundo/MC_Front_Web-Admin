import { Loader } from '@/components/ui/Loader'
import { Agent, Briefcase, Company } from '@/icons'
import React, { type Key, useMemo, useState } from 'react'
import AgentProfile from './AgentProfile'
import { useGetCustomAgentById } from '@/hooks/api/useCustomAgents'
import CustomTabs from '@/components/tabs/CustomTabs'
import AgentCompanyInfo from './AgentCompanyInfo'
import AgentWorkExperience from './AgentWorkExperience'

type AgentDetailsProps = {
  currentIdAgent: number | null
}

const AgentDetails = ({ currentIdAgent }: AgentDetailsProps) => {
  const { data: agentData, isLoading } = useGetCustomAgentById(
    Number(currentIdAgent)
  )

  const [selected, setSelected] = useState('profile')

  const handleSelectionChange = (key: Key) => {
    if (typeof key === 'string') {
      setSelected(key)
    }
  }

  const agent = useMemo(() => {
    if (agentData !== undefined) {
      return agentData.data
    }
    return null
  }, [agentData])

  const tabs = useMemo(() => {
    return [
      {
        key: 'profile',
        title: (
          <div className='flex items-center space-x-2'>
            <Agent className='w-5 h-5' />
            <span>Perfil del Agente</span>
          </div>
        ),
        content: <AgentProfile agent={agent}/>
      },
      {
        key: 'company',
        title: (
          <div className='flex items-center space-x-2'>
            <Company className='w-5 h-5' />
            <span>Información de la Empresa</span>
          </div>
        ),
        content: <AgentCompanyInfo agent={agent}/>
      },
      {
        key: 'work-experience',
        title: (
          <div className='flex items-center space-x-2'>
            <Briefcase className='w-5 h-5' />
            <span>Experiencia laboral</span>
          </div>
        ),
        content: <AgentWorkExperience agent={agent}/>
      }
    ]
  }, [agent])

  if (isLoading) {
    return (
      <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
        <Loader />
      </div>
    )
  }
  return (
    <div className=''>
      <CustomTabs
        tabs={tabs}
        selectedKey={selected}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  )
}

export default AgentDetails
