import { formatPrice } from '@/lib/utils/utils'
import { type PublicationResponse } from '@/types/api/response/publication'
import { Avatar } from '@nextui-org/react'
import React, { useMemo } from 'react'

type HeaderPublicationProps = {
  publication: PublicationResponse | undefined
  isTransmission?: boolean
  currentButtonSelected?: string
  handleChangeButton?: (value: string) => void
  hasGifts?: boolean
}
const HeaderPublication = ({
  publication,
  isTransmission = true,
  currentButtonSelected = 'video',
  hasGifts = false,
  handleChangeButton
}: HeaderPublicationProps) => {
  const countryCode = useMemo(() => {
    return (
      publication?.vehicle?.city?.country.country_code.toLowerCase().trim() ??
      ''
    )
  }, [publication])

  const countryName = publication?.vehicle?.city?.country.country_name ?? ''
  const cityName = publication?.vehicle?.city?.city_name ?? ''
  const publicationCode = publication?.publication_code ?? ''
  const title = publication?.vehicle.name_vehicle
  const price = isTransmission
    ? publication?.auction.starting_price
    : publication?.vehicle.sale_price
  console.log(currentButtonSelected)
  return (
    <>
      <div className='flex flex-row gap-4 dark:text-white'>
        <div className='text-start text-default-500 dark:text-white flex flex-row gap-2 justify-start items-center'>
          {countryName !== undefined && (
            <Avatar
              alt={`Bandera de ${countryName}`}
              className='w-5 h-5'
              src={`https://flagcdn.com/${countryCode}.svg`}
            />
          )}
          <span className='text-xs'>{`${cityName ?? 'Ciudad no Registrada'}, ${
            countryName ?? 'País no Registrado'
          }`}</span>
        </div>
        <div className='font-semibold'>{`Lote #${
          publicationCode ?? 'No registrado'
        }`}</div>
      </div>
      <h1 className='font-bold text-black/80 text-lg dark:text-white'>
        {title}
      </h1>
      <div className='flex flex-row justify-between'>
        <span className='text-lg dark:text-white'>
          {price !== undefined
            ? formatPrice(Number(price))
            : 'Precio Inicial No Registrado'}
        </span>
        <div className='flex flex-row gap-2 mb-2'>
          <div
            className={`py-1 px-3 hover:cursor-pointer rounded-lg flex justify-center items-center ${
              currentButtonSelected === 'video'
                ? 'bg-primary text-white'
                : 'bg-slate-200 text-gray-400'
            }`}
            onClick={() => {
              if (handleChangeButton !== undefined) {
                handleChangeButton('video')
              }
            }}
          >
            <span className=''>Video</span>
          </div>

          <div
            className={`py-1 px-3 hover:cursor-pointer rounded-lg flex justify-center items-center ${
              currentButtonSelected === 'gallery'
                ? 'bg-primary text-white'
                : 'bg-slate-200 text-gray-400'
            }`}
            onClick={() => {
              if (handleChangeButton !== undefined) {
                handleChangeButton('gallery')
              }
            }}
          >
            <span className=''>Fotos</span>
          </div>
          {hasGifts && (
            <div
              className={`py-1 px-3 hover:cursor-pointer rounded-lg flex justify-center items-center ${
                currentButtonSelected === 'gift'
                  ? 'bg-primary text-white'
                  : 'bg-slate-200 text-gray-400'
              }`}
              onClick={() => {
                if (handleChangeButton !== undefined) {
                  handleChangeButton('gift')
                }
              }}
            >
              <span className=''>Fotos Regalo</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default HeaderPublication
