import { formatTimestamp } from '@/lib/utils/utils'
import { type ChatMember } from '@/types/chat/chat'
import { Avatar } from '@nextui-org/react'
import React, { useMemo } from 'react'

type ReceivedMessageProps = {
  content: string
  members: ChatMember[]
  currentId: string
  timeStamp: string
}

const ReceivedMessage = ({
  content,
  members,
  currentId,
  timeStamp
}: ReceivedMessageProps) => {
  const currentMember = useMemo(() => {
    const current = members.find((member) => member.id === currentId)
    return current
  }, [members, currentId])

  return (
    <div className='w-full flex flex-row gap-2 items-start my-2'>
      <div>
        <Avatar size='sm' src={currentMember?.urlAvatar ?? ''} />
      </div>
      <div className='w-full h-auto flex flex-col'>

      <div className='w-full h-auto p-2 border bg-[#3f3f46]/40 rounded-xl'>
        <div className='flex flex-col'>
          <span className='text-xs font-bold text-primary'>
            {currentMember?.name}
          </span>
          <span className='text-[10px] font-light italic text-gray-800'>
            {currentMember?.role}
          </span>
          <p className='text-xs text-black'>{content}</p>
        </div>
      </div>
      <p className='text-[10px] text-blackText'>{formatTimestamp(timeStamp)}</p>
      </div>
    </div>
  )
}

export default ReceivedMessage
