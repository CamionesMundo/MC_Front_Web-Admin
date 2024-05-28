'use client'
import CustomAgentForm from '@/components/features/custom-agents/CustomAgentForm'
import { MainContainer } from '@/components/ui'
import React from 'react'

const CustomAgentEditPage = () => {
  return (
    <MainContainer>
      <CustomAgentForm isEditing={true} />
    </MainContainer>
  )
}

export default CustomAgentEditPage
