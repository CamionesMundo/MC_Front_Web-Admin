import { CustomInput } from '@/components'
import { type FormErrorMessages } from '@/helpers/error'
import { useCustomAgentFormStore } from '@/store/useCustomAgentForm'
import { type CustomAgentsResponse } from '@/types/api/response/custom-agents'
import { Divider, Spacer } from '@nextui-org/react'
import React, { useEffect } from 'react'

type AgentFormBankProps = {
  isEditing: boolean
  agent: CustomAgentsResponse | undefined
  errors: FormErrorMessages | null
}

const AgentFormBank = ({ isEditing, agent, errors }: AgentFormBankProps) => {
  const { updateBankData, bankData } = useCustomAgentFormStore()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = e.target

    updateBankData({
      [name]: value
    })
  }

  useEffect(() => {
    if (isEditing && agent !== undefined) {
      updateBankData({
        bankName: agent.company_informations?.bank_name ?? '',
        bankAccount: agent.company_informations?.bank_account ?? '',
        typeAccount: agent.company_informations?.account_type ?? '',
        swiftCode: agent.company_informations?.swift_code ?? ''
      })
    }
  }, [agent, isEditing, updateBankData])
  return (
    <>
      <Spacer />
      <Divider />
      <div className='mt-3'>
        <h1 className='font-semibold text-blackText dark:text-white'>
          Datos Bancarios
        </h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 items-start lg:grid-cols-3 gap-3 md:gap-x-4 md:gap-y-1 mb-3'>
        <CustomInput
          name='bankName'
          type='text'
          onChange={(e) => {
            handleChange(e, 'bankName')
          }}
          value={bankData.bankName}
          color={errors?.bankName !== undefined ? 'danger' : 'primary'}
          label='Nombre del banco'
          placeholder='Ej. Banco de chile'
          error={errors?.bankName?.toString() ?? ''}
        />
        <CustomInput
          name='bankAccount'
          type='text'
          onChange={(e) => {
            handleChange(e, 'bankAccount')
          }}
          value={bankData.bankAccount}
          color={errors?.bankAccount !== undefined ? 'danger' : 'primary'}
          label='Cuenta bancaria'
          placeholder='Ej. 123456789'
          error={errors?.bankAccount?.toString() ?? ''}
        />
        <CustomInput
          name='typeAccount'
          type='text'
          onChange={(e) => {
            handleChange(e, 'typeAccount')
          }}
          value={bankData.typeAccount}
          color={errors?.typeAccount !== undefined ? 'danger' : 'primary'}
          label='Tipo de cuenta'
          placeholder='Ej. Corriente'
          error={errors?.typeAccount?.toString() ?? ''}
        />
        <CustomInput
          name='swiftCode'
          type='text'
          onChange={(e) => {
            handleChange(e, 'swiftCode')
          }}
          value={bankData.swiftCode}
          color={errors?.swiftCode !== undefined ? 'danger' : 'primary'}
          label='Código Swift'
          placeholder='Ej. ABCD1234'
          error={errors?.swiftCode?.toString() ?? ''}
        />
      </div>
    </>
  )
}

export default AgentFormBank
