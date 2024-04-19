'use client'

import { useEffect } from 'react'

export default function Error ({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='flex h-full w-full flex-col items-center justify-center  p-4'>
      <div className='flex w-fit max-w-screen-lg flex-col rounded-md border border-red-600 p-6'>
        <h2 className='text-2xl font-bold'>Ha ocurrido un error!</h2>
        <p className='mt-4 font-bold text-gray-500'>{error.name}:</p>
        <p className='mb-6 mt-2 text-gray-500'>{error.message}</p>
        <button
          className='mt-4 w-full rounded bg-red-500 p-2 text-white'
          onClick={() => {
            reset()
          }}
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}
