'use client'
import LotForm from '@/components/features/post-management/lots/LotForm'
import { MainContainer } from '@/components/ui'
import React from 'react'

const LotsEditPage = () => {
  return (
    <MainContainer>
      <LotForm isEditing />
    </MainContainer>
  )
}

export default LotsEditPage
