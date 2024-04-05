import AdminForm from '@/components/features/users-management/collaborators/AdminForm'
import React from 'react'

const CreateCollaboratorsPage = () => {
  return (
    <div className='w-full bg-white/70 p-2 md:p-4 rounded-lg border border-gray-500/60 h-full overflow-y-auto'>
      <AdminForm />
    </div>
  )
}

export default CreateCollaboratorsPage
