import React, { type ReactNode } from 'react'

type MainContainerProps = {
  children: ReactNode
}
const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div className='w-full bg-white/90 dark:bg-darkBg/50 py-3 px-3 md:py-4 md:px-4 rounded-lg border border-gray-500/60 h-full overflow-y-auto'>
      {children}
    </div>
  )
}

export { MainContainer }
