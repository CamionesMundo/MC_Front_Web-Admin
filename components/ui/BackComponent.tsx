import React from 'react'
import { LeftArrow } from '@/icons'
import { useGoBackPage } from '@/lib/utils/utils'

type BackComponentProps = {
  title: string
  subtitle: string
  onAction?: () => void
}

/**
 * Component for rendering a back button with title and subtitle.
 * @param title The title to display.
 * @param subtitle The subtitle to display.
 * @param onAction Callback function to execute an action on button click.
 */
const BackComponent = ({ title, subtitle, onAction }: BackComponentProps) => {
  /**
   * Hook to handle navigating back to the previous page.
   */
  const { handleGoBack } = useGoBackPage()
  return (
    <div className='  w-full flex justify-start items-center gap-4 flex-row'>
      <div
        className=' bg-transparent border-black/50 border-1 w-10 h-10 flex justify-center items-center rounded-lg hover:cursor-pointer hover:opacity-100 opacity-85'
        onClick={() => {
          handleGoBack()
          if (onAction !== undefined) {
            onAction()
          }
        }}
      >
        <LeftArrow className='w-4 h-4 text-black' />
      </div>
      <div className='flex flex-col text-black/70'>
        <span className='text-xs md:text-sm'>{title}</span>
        <span className='font-bold text-sm md:text-xl'>{subtitle}</span>
      </div>
    </div>
  )
}

export { BackComponent }
