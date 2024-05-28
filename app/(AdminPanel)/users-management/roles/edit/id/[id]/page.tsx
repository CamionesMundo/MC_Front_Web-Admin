'use client'
import RolesForm from '@/components/features/users-management/roles/RolesForm'
import { MainContainer } from '@/components/ui'
import React from 'react'

const EditRolesPage = () => {
  return (
    <MainContainer>
      <RolesForm isEditing={true} />
    </MainContainer>
  )
}

export default EditRolesPage
