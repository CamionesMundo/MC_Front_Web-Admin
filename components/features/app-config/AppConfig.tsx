'use client'

import { BackComponent } from '@/components/ui/BackComponent'
import { useMemo } from 'react'
import { useGetAllParameters } from '@/hooks/api/useAppConfig'
import { AppParametersType } from '@/types/enums'
import InputParameter from './InputParameter'
import { Loader } from '@/components/ui/Loader'
import TextAreaParameter from './TextAreaParameter'
import AdminParameter from './AdminParameter'

const AppConfig = () => {
  const { data: response, isLoading } = useGetAllParameters()

  const appParameters = useMemo(() => {
    if (response?.data !== undefined || response?.data !== null) {
      return response?.data
    } else {
      return []
    }
  }, [response?.data])

  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent title=' ' subtitle='Configuraciones de la App' />
      </div>
      <div>
        <p className='text-xs mb-2 dark:text-white'>
          Gestione las configuraciones de cada uno de los parámetros de la
          aplicación para dispositivos móviles.
        </p>
      </div>
      {isLoading && (
        <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
          <Loader />
        </div>
      )}
      {!isLoading && (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-x-4 md:gap-y-1'>
            {appParameters !== undefined &&
              appParameters?.length > 0 &&
              appParameters.map((parameter) => {
                if (parameter.idparameter === AppParametersType.DefaultAdmin) {
                  return <AdminParameter key={parameter.idparameter} item={parameter}/>
                }
                if (
                  parameter.idparameter ===
                  AppParametersType.CustomAgentDescription
                ) {
                  return null
                } else {
                  return (
                    <InputParameter
                      key={parameter.idparameter}
                      item={parameter}
                    />
                  )
                }
              })}
          </div>
          <div className='w-1/2'>
            {appParameters !== undefined &&
              appParameters?.length > 0 &&
              appParameters.map((parameter) => {
                if (
                  parameter.idparameter ===
                  AppParametersType.CustomAgentDescription
                ) {
                  return (
                    <TextAreaParameter
                      key={parameter.idparameter}
                      item={parameter}
                    />
                  )
                } else {
                  return null
                }
              })}
          </div>
        </>
      )}
    </>
  )
}

export default AppConfig
