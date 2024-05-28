import { CustomRadio } from '@/components/radios/ThemeRadio'
import { useResponsive } from '@/hooks/useResponsive'
import { ThemeDark, ThemeLight } from '@/icons'
import { RadioGroup } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import React from 'react'

const Appearance = () => {
  const isMobile = useResponsive()
  const { theme, setTheme } = useTheme()
  return (
    <div className='mt-4'>
      <h1 className='font-semibold text-blackText dark:text-white'>Tema</h1>
      <span className='text-sm text-black/70 dark:text-white/70'>
        Cambia la apariencia de la web.
      </span>
      <div className='mt-3'>
        <RadioGroup
          orientation={isMobile ? 'vertical' : 'horizontal'}
          value={theme}
          onValueChange={setTheme}
        >
          <CustomRadio
            value='light'
            className='bg-slate-200 dark:bg-gray-700 flex px-2 pt-4 pb-0 relative w-64 h-28 overflow-hidden rounded-md'
          >
            <>
              <div className='z-10 -mt-12'>
                <span className='z-10'>Light</span>
              </div>
              <ThemeLight className=' w-48 h-32 absolute -top-10' />
            </>
          </CustomRadio>
          <CustomRadio
            value='dark'
            className='bg-slate-200 dark:bg-gray-700 flex px-2 pt-4 pb-0 relative w-64 h-28 overflow-hidden rounded-md'
          >
            <>
              <div className='z-10 -mt-12'>
                <span className='z-10'>Dark</span>
              </div>
              <ThemeDark className=' w-48 h-32 absolute -top-10' />
            </>
          </CustomRadio>
        </RadioGroup>
      </div>
    </div>
  )
}

export default Appearance
