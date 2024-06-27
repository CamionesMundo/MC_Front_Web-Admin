import { Publication } from '@/icons'
import React from 'react'

const PostNotFound = () => {
  return (
    <div className='w-full flex justify-center items-center p-10 bg-zinc-200 rounded-lg'>
      <div className=' max-w-80 p-6 flex flex-col text-center'>
        <div className='flex justify-center mb-2'>
          <Publication className='w-10 h-10 text-zinc-600' />
        </div>
        <span className='text-default-600 text-2xl font-semibold'>Oops !</span>
        <span className='text-default-500'>Publicación no encontrada</span>
      </div>
    </div>
  )
}

export default PostNotFound
