'use client'
import { type ReceivingPortData } from '@/types/api/response/address'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { useFilter } from '@react-aria/i18n'
import { useAsyncList } from '@react-stately/data'
import React, { useState, type Key, useEffect } from 'react'

/**
 * The `PortAutocomplete` component provides an autocomplete input for selecting receiving ports.
 * It fetches and displays a list of receiving ports from a specified backend URL and allows the user
 * to search and select a port. The component uses React's state and effect hooks to manage
 * and update its state based on user interaction and fetched data.
 *
 * Props:
 * @param {ReceivingPortData | null | undefined} currentPort - The currently selected receiving port, if any.
 * @param {(port: ReceivingPortData | undefined) => void} changePort - A callback function that updates the state of the parent component with the new selected receiving port.
 * @param {string} [error] - An optional error message to be displayed above the autocomplete input if something goes wrong.
 *
 * The component utilizes a number of hooks:
 * - useState to manage internal state of the input and selected items.
 * - useEffect to handle side effects related to fetching port data and updating the input based on the current port.
 * - useAsyncList from @react-stately/data to asynchronously fetch port data from the backend.
 * - useFilter from @react-aria/i18n for filtering the port list based on user input.
 *
 * It is designed to be flexible and responsive, with custom styling options passed to the NextUI `Autocomplete` component.
 * Errors are displayed conditionally based on the `error` prop.
 */

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

  const onSelectionChange = (key: Key | null) => {
    if (key === null) {
      setFieldState((prevState) => ({
        ...prevState,
        inputValue: '',
        selectedKey: null,
        currentPort: undefined
      }))
      changePort(undefined)
      return
    }
    setFieldState((prevState) => {
      const selectedItem = prevState.items.find(
        (option) => option.idreceiving_port.toString() === (key as string)
      )

      const portName = selectedItem !== undefined ? selectedItem.name : ''
      return {
        ...prevState,
        inputValue: portName,
        selectedKey: key,
        currentPort: selectedItem
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
    } else {
      setFieldState({
        inputValue: '',
        currentPort: undefined,
        selectedKey: '',
        items: list.items
      })
    }
  }, [list.items, port])

  return (
    <div
      className={`flex flex-col justify-center mb-4 ${
        error !== '' ? 'mt-4' : 'mt-4'
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
            inputWrapper: `border rounded-xl dark:text-white ${
              error !== ''
                ? 'border-danger'
                : 'border-[#e0e0e0] dark:data-[hover=true]:border-white dark:focus-whithin:border-white'
            }`,
            label: 'font-semibold dark:text-white'
          }
        }}
        color={error !== '' ? 'danger' : 'primary'}
        label={'Puerto'}
        placeholder='Seleccione'
        radius='sm'
        variant='faded'
        isLoading={list.isLoading}
        errorMessage={ error !== '' && `(*) ${error}`}
      >
        {(item) => {
          return (
            <AutocompleteItem key={item.idreceiving_port} textValue={item.name}>
              {item.name}
            </AutocompleteItem>
          )
        }}
      </Autocomplete>
    </div>
  )
}

export default PortAutocomplete
