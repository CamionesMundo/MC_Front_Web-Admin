'use client'
import CustomTabs from '@/components/tabs/CustomTabs'
import { BackComponent } from '@/components/ui/BackComponent'
import { useState, type Key } from 'react'
import Profile from './Profile'
import Account from './Account'
import Appearance from './Appearance'
import { type TabItem } from '@/types/ui/tab'

const SettingsView = () => {
  const [selected, setSelected] = useState('profile')

  const handleSelectionChange = (key: Key) => {
    if (typeof key === 'string') {
      setSelected(key)
    }
  }

  const tabs: TabItem[] = [
    { key: 'profile', title: 'Perfil', content: <Profile /> },
    { key: 'account', title: 'Cuenta', content: <Account /> },
    { key: 'appearance', title: 'Apariencia', content: <Appearance /> }
  ]
  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent title=' ' subtitle='Configuración de cuenta' />
      </div>
      <div>
        <p className='text-xs mb-2'>
          Personalice la configuración de tu perfil, tu cuenta, y apariencia web
        </p>
      </div>
      <div className='mt-4'>
        <CustomTabs
          tabs={tabs}
          selectedKey={selected}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </>
  )
}

export default SettingsView
