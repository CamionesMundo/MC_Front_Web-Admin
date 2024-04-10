import SettingsView from '@/components/features/settings/Settings'
import React from 'react'

const SettingsPage = () => {
  return (
    <div className='w-full bg-white/70 p-2 md:p-4 rounded-lg border border-gray-500/60 h-full overflow-y-auto'>
      <SettingsView />
    </div>
  )
}

export default SettingsPage
