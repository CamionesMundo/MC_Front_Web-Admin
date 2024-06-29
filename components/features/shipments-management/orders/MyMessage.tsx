import { formatTimestamp } from '@/lib/utils/utils'
import React from 'react'
type MyMessageProps = {
  content: string
  isLast: boolean
  timestamp: string
}
const MyMessage = ({ content, isLast, timestamp }: MyMessageProps) => {
  return (
    <div className='text-sm flex justify-end w-full pr-4 mb-2'>
      <div className='mine messages flex flex-col'>
        <div className={`message ${isLast ? 'last' : ''}`}>
          <p className='text-xs'>{content}</p>
        </div>
        <p className='text-[10px] text-blackText'>
          {formatTimestamp(timestamp)}
        </p>
      </div>
    </div>
  )
}

export default MyMessage
