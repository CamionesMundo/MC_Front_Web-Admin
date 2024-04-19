import React, { type ReactNode } from 'react'

type MainContainerProps = {
  children: ReactNode
}
const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div className='w-full bg-white/90 dark:bg-darkBg/50 p-2 md:p-4 rounded-lg border border-gray-500/60 h-full overflow-y-auto'>
      {children}
    </div>
  )
}

export { MainContainer }
