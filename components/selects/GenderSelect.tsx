'use client'
import { Sex } from '@/types/enums'
import { CustomSelect } from '.'
import { SelectItem } from '@nextui-org/react'
import { useState, type ChangeEvent, useCallback, useEffect } from 'react'

type GenderSelectProps = {
  error?: string | undefined
  selected?: string | undefined | null
  onChange?: (value: Sex | undefined) => void
}

type SexItem = {
  key: Sex
  value: string
}

const sexItems: SexItem[] = [
  {
    key: Sex.Hombre,
    value: 'Hombre'
  },
  {
    key: Sex.Mujer,
    value: 'Mujer'
  }
]

const GenderSelect = ({ error, selected, onChange }: GenderSelectProps) => {
  const [selectedType, setSelectedType] = useState<string>(selected ?? '')

  const handleSelectionChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setSelectedType(e.target.value)
      if (onChange !== undefined) {
        onChange(e.target.value as Sex)
      }
    },
    [onChange]
  )
  useEffect(() => {
    if (selected !== undefined && selected !== null) {
      setSelectedType(selected)
    }
  }, [selected])

  return (
    <CustomSelect
      name='sex'
      color={error !== undefined ? 'danger' : 'primary'}
      error={error ?? ''}
      selectedKeys={[selectedType]}
      onChange={handleSelectionChange}
      label='Género'
    >
      {sexItems.map((item) => (
        <SelectItem key={item.key} value={item.value}>
          {item.value}
        </SelectItem>
      ))}
    </CustomSelect>
  )
}

export default GenderSelect
