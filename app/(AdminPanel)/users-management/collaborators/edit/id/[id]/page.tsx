'use client'
import AdminForm from '@/components/features/users-management/collaborators/AdminForm'
import { MainContainer } from '@/components/ui'
import React from 'react'

const EditAdminPage = () => {
  return (
    <MainContainer>
      <AdminForm isEditing />
    </MainContainer>
  )
}

export default EditAdminPage
