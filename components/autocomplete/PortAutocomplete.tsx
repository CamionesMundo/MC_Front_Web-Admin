'use client'
import { type ReceivingPortData } from '@/types/api/response/address'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { useFilter } from '@react-aria/i18n'
import { useAsyncList } from '@react-stately/data'
import React, { useState, type Key, useEffect } from 'react'

type PortAutocompleteProps = {
  currentPort: ReceivingPortData | null | undefined
  changePort: (port: ReceivingPortData | undefined) => void
  error?: string
}
type FieldState = {
  selectedKey: Key | null
  inputValue: string
  currentPort: ReceivingPortData | undefined | null
  items: ReceivingPortData[]
}
const PortAutocomplete = ({
  currentPort: port,
  changePort,
  error
}: PortAutocompleteProps) => {
  const [fieldState, setFieldState] = useState<FieldState>({
    selectedKey: '',
    inputValue: '',
    currentPort: port,
    items: []
  })

  const list = useAsyncList<ReceivingPortData>({
    async load ({ signal }) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/core/receiving-port`,
        {
          signal
        }
      )
      const json = await res.json()
      return { items: json.data }
    }
  })

  useEffect(() => {
    if (port === undefined) {
      setFieldState({
        selectedKey: '',
        inputValue: '',
        currentPort: port,
        items: list.items
      })
    }
  }, [port, list.items])

  const filter = useFilter({ sensitivity: 'base' })

  const onSelectionChange = (key: Key) => {
    setFieldState((prevState) => {
      const selectedItem = prevState.items.find(
        (option) => option.idreceiving_port.toString() === (key as string)
      )

      const portName = selectedItem !== undefined ? selectedItem.name : ''
      return {
        ...prevState,
        inputValue: portName,
        selectedKey: key,
        currentCountry: selectedItem
      }
    })
    const filtered = list.items.find(
      (item) => item.idreceiving_port.toString() === (key as string)
    )
    changePort(filtered)
  }

  const onInputChange = (value: string) => {
    if (value === '') {
      setFieldState((prevState) => ({
        inputValue: value,
        currentPort: undefined,
        selectedKey: value === '' ? null : prevState.selectedKey,
        items: list.items
      }))
      return
    }
    setFieldState((prevState) => ({
      inputValue: value,
      currentPort: undefined,
      selectedKey: value === '' ? null : prevState.selectedKey,
      items: list.items.filter((item) => filter.startsWith(item.name, value))
    }))
  }
  useEffect(() => {
    if (list.items.length > 0 && port?.name !== undefined) {
      setFieldState({
        inputValue: port.name,
        currentPort: port,
        selectedKey: port.idreceiving_port.toString(),
        items: list.items
      })
    }
  }, [list.items, port])

  return (
    <div
      className={`flex flex-col justify-center mb-4 ${
        error !== '' ? 'mt-8' : 'mt-4'
      }`}
    >
      <Autocomplete
        inputValue={fieldState.inputValue}
        items={fieldState.items}
        selectedKey={fieldState.selectedKey as string}
        onInputChange={onInputChange}
        onSelectionChange={onSelectionChange}
        classNames={{
          base: 'items-center',
          listboxWrapper: 'max-h-[320px]',
          selectorButton: 'text-default-500'
        }}
        inputProps={{
          classNames: {
            inputWrapper: `border ${
              error !== '' ? 'border-danger' : 'border-[#e0e0e0]'
            }`,
            label: 'font-semibold'
          }
        }}
        color={error !== '' ? 'danger' : 'primary'}
        label={'Puerto'}
        placeholder='Seleccione'
        radius='sm'
        variant='faded'
        isLoading={list.isLoading}
      >
        {(item) => {
          return (
            <AutocompleteItem key={item.idreceiving_port} textValue={item.name}>
              {item.name}
            </AutocompleteItem>
          )
        }}
      </Autocomplete>
      {error !== '' && (
        <span className='text-danger text-xs italic'>{`(*) Error: ${error}`}</span>
      )}
    </div>
  )
}

export default PortAutocomplete
