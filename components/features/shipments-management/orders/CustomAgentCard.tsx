import { type CustomAgentsResponse } from '@/types/api'
import { Avatar } from '@nextui-org/react'
import React from 'react'

type CustomAgentCardProps = { agent: CustomAgentsResponse | null | undefined }

const CustomAgentCard = ({ agent }: CustomAgentCardProps) => {
  const fullName = `${agent?.name} ${agent?.surname}`
  return (
    <div className='w-full md:w-auto flex flew-row gap-2 items-center'>
      <div className='md:w-[50px] w-16 h-16 md:h-[50px] '>
        <Avatar
          className='md:w-[50px] w-16 h-16 md:h-[50px]'
          src={agent?.profile_gallery?.files[0].url ?? ''}
        />
      </div>

      <div className='flex flex-col'>
        <span className='dark:text-white text-sm'>
          {fullName }
        </span>
        <span className='text-default-500 text-sm dark:text-white'>
          {agent?.email ?? 'Sin Registro'}
        </span>
      </div>
    </div>
  )
}

export default CustomAgentCard
