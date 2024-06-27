import { GenericButton } from '@/components'
import CustomModal from '@/components/modal/CustomModal'
import CustomTable from '@/components/table/CustomTable'
import { BackComponent } from '@/components/ui/BackComponent'
import { customAgentsColumns } from '@/const/columns/users'
import { Edit } from '@/icons'
import { type AgentDataType } from '@/types/api/response/custom-agents'
import { useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'
import AgentDetails from './AgentDetails'

type CustomAgentsProps = {
  agents: AgentDataType[]
  isLoading: boolean
}

const CustomAgents = ({ agents, isLoading }: CustomAgentsProps) => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentIdAgent, setCurrentIdAgent] = useState<number | null>(null)
  const [filterValue, setFilterValue] = useState('')

  const hasSearchFilter = Boolean(filterValue)
  const onCreateRole = () => {
    router.push('/customs-agents/create')
  }

  const onEditRole = (id: number) => {
    router.push(`/customs-agents/edit/id/${id}`)
  }

  const onSearchChange = useCallback((value: string) => {
    if (value !== undefined) {
      setFilterValue(value)
    } else {
      setFilterValue('')
    }
  }, [])

  const filteredItems = useMemo(() => {
    if (agents !== undefined) {
      let filtered = agents?.length > 0 ? [...agents] : []

      if (hasSearchFilter) {
        filtered = filtered.filter(
          (item) =>
            item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
            item.surname.toLowerCase().includes(filterValue.toLowerCase())
        )
      }

      return filtered
    }

    return []
  }, [agents, filterValue, hasSearchFilter])

  const gotoEditAgent = (id: number) => {
    router.push(`/customs-agents/edit/id/${id}`)
  }

  const handleOnMoreDetails = (id: number) => {
    setCurrentIdAgent(id)
    onOpen()
  }
  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent title=' ' subtitle='Agentes Aduaneros' />
      </div>
      <div>
        <p className='text-xs mb-2 dark:text-white'>
          Gestiona en esta sección los datos de los agentes aduaneros asociados
          a Mundo Camiones.
        </p>
      </div>
      <CustomTable<AgentDataType>
        filteredItems={filteredItems}
        filterValue={filterValue}
        handleSearch={onSearchChange}
        columns={customAgentsColumns}
        emptyLabel={isLoading ? '' : 'No tienes ningún agente aduanero creado'}
        totalLabel='agentes aduaneros'
        initialVisibleColumns={customAgentsColumns
          .map((column) => column.key)
          .filter((key) => key !== 'updatedAt')}
        newButtonLabel={'Nuevo Agente'}
        onEdit={onEditRole}
        onViewMore={handleOnMoreDetails}
        onDelete={() => {}}
        isLoading={isLoading}
        actionOnAdd={onCreateRole}
        actions={{
          useViewMore: true,
          useEdit: true,
          useDelete: true
        }}
      />

      <CustomModal
        titleModal={'Detalles del Agente aduanero'}
        isOpen={isOpen}
        onClose={onClose}
        size='5xl'
        footer={
          <div className='w-full flex justify-end'>
            <div className='md:w-1/4 sm:w-1/2 w-full'>
              <GenericButton
                type='button'
                label={'Editar datos'}
                startContent={<Edit className='w-3.5 h-3.5' />}
                onClick={() => {
                  gotoEditAgent(currentIdAgent ?? 0)
                }}
              />
            </div>
          </div>
        }
      >
        <AgentDetails currentIdAgent={currentIdAgent}/>
      </CustomModal>
    </>
  )
}

export default CustomAgents