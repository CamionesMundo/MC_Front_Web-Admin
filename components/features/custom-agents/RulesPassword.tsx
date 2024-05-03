import React from 'react'

type RulesPasswordProps = { content: string }

const RulesPassword = ({ content }: RulesPasswordProps) => {
  return (
    <div className='flex gap-1 flex-row items-center'>
      <div className='flex justify-center items-center'>
        <div
          className={
            'border border-blackText dark:border-white w-2 h-2 rounded-full'
          }
        ></div>
      </div>
      <p className={'text-xs text-blackText dark:text-white m-0'}>{content}</p>
    </div>
  )
}

export default RulesPassword
