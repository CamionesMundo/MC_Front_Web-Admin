import { Avatar, CircularProgress } from '@nextui-org/react'
import React from 'react'

type CountDownProps = {
  countryCode: string | undefined
  countryName: string | undefined
  seconds: number
  secondsPercent: number
}

const CountDown = ({
  countryCode,
  countryName,
  seconds,
  secondsPercent
}: CountDownProps) => {
  return (
    <div className='flex flex-row items-center gap-6 justify-start dark:text-white'>
      <div className='relative'>
        <CircularProgress
          aria-label='Cargando...'
          classNames={{
            svg: 'h-16 w-16 md:w-16 md:h-16 drop-shadow-md',
            indicator: 'stroke-secondary',
            track: 'stroke-white/10',
            value: 'hidden'
          }}
          value={secondsPercent}
          strokeWidth={3}
          showValueLabel={true}
        />
        <div className='absolute w-6 h-6 md:w-7 md:h-7 top-0 left-0 right-0 bottom-0 m-auto flex justify-center items-center'>
          {countryName !== undefined && (
            <Avatar
              alt={`Bandera de ${countryName}`}
              className='w-5 h-5'
              src={`https://flagcdn.com/${countryCode}.svg`}
            />
          )}
        </div>
      </div>
      <span className='text-5xl font-bold'>{seconds}</span>
    </div>
  )
}

export default CountDown
