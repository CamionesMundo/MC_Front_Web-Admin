'use client'
import { BASE_AGENTS_URL } from '@/const/base-url'
import { Search } from '@/icons'
import api from '@/lib/axios/axios-client'
import { type CustomAgentsResponse, type GenericResponse } from '@/types/api'
import { Autocomplete, AutocompleteItem, Avatar } from '@nextui-org/react'
import { useFilter } from '@react-aria/i18n'
import { useAsyncList } from '@react-stately/data'
import React, { useState, type Key, useEffect } from 'react'

/**
 * The `CustomAgentsAutocomplete` component provides a user interface for selecting custom agents
 * via an autocomplete field. This component fetches the list of custom agents from the API
 * and allows for dynamic selection by filtering based on user input.
 *
 * Props:
 * @param {CustomAgentsResponse | null | undefined} currentCustomAgent - The currently selected custom agent, if any.
 * @param {(admin: CustomAgentsResponse | undefined) => void} changeCustomAgent - Callback function that is invoked when a new custom agent is selected.
 * @param {string} [error] - Optional error message to display in the component in case of an error during the operation.
 *
 * Behavior:
 * - Utilizes `useAsyncList` to manage asynchronous loading and handling of the custom agents list.
 * - Filters available administrators based on user input.
 * - Allows for clear selection and display of a previously selected custom agent.
 * - Displays appropriate error messages in case of errors during selection or data loading.
 *
 * This component is useful in forms where custom agent selection is required.
 */
type CustomAgentsAutocompleteProps = {
  currentCustomAgent: CustomAgentsResponse | null | undefined
  changeCustomAgent: (customAgent: CustomAgentsResponse | undefined) => void
  error?: string
  labelAutocomplete?: string | undefined
}
type FieldState = {
  selectedKey: Key | null
  inputValue: string
  currentCustomAgent: CustomAgentsResponse | undefined | null
  items: CustomAgentsResponse[]
}
const CustomAgentsAutocomplete = ({
  currentCustomAgent: customAgent,
  changeCustomAgent,
  error,
  labelAutocomplete = 'Agente aduanero'
}: CustomAgentsAutocompleteProps) => {
  const [fieldState, setFieldState] = useState<FieldState>({
    selectedKey: '',
    inputValue: '',
    currentCustomAgent: customAgent,
    items: []
  })

  const list = useAsyncList<CustomAgentsResponse>({
    async load ({ signal }) {
      try {
        const response = await api.get<GenericResponse<CustomAgentsResponse[]>>(
          BASE_AGENTS_URL,
          { signal }
        )

        return { items: response.data.data }
      } catch (error) {
        console.log('Error fetching admin users:', error)
        throw error
      }
    }
  })

  useEffect(() => {
    if (customAgent === undefined) {
      setFieldState({
        selectedKey: '',
        inputValue: '',
        currentCustomAgent: customAgent,
        items: list.items
      })
    }
  }, [customAgent, list.items])

  const filter = useFilter({ sensitivity: 'base' })

  const onSelectionChange = (key: Key | null) => {
    if (key === null) {
      setFieldState((prevState) => ({
        ...prevState,
        inputValue: '',
        selectedKey: null,
        currentCustomAgent: undefined
      }))
      changeCustomAgent(undefined)
      return
    }

    setFieldState((prevState) => {
      const selectedItem = prevState.items.find(
        (option) => option.idcustoms_agent.toString() === (key as string)
      )

      const agentName = selectedItem !== undefined ? selectedItem.name : ''
      return {
        ...prevState,
        inputValue: agentName,
        selectedKey: key,
        currentCustomAgent: selectedItem
      }
    })
    const filtered = list.items.find(
      (item) => item.idcustoms_agent.toString() === (key as string)
    )
    changeCustomAgent(filtered)
  }

  const onInputChange = (value: string) => {
    if (value === '') {
      setFieldState((prevState) => ({
        inputValue: value,
        currentCustomAgent: undefined,
        selectedKey: value === '' ? null : prevState.selectedKey,
        items: list.items
      }))
      return
    }
    setFieldState((prevState) => ({
      inputValue: value,
      currentCustomAgent: undefined,
      selectedKey: value === '' ? null : prevState.selectedKey,
      items: list.items.filter((item) => filter.startsWith(item.name, value))
    }))
  }
  useEffect(() => {
    if (list.items.length > 0 && customAgent?.name !== undefined) {
      setFieldState({
        inputValue: customAgent.name,
        currentCustomAgent: customAgent,
        selectedKey: customAgent.idcustoms_agent.toString(),
        items: list.items
      })
    }
  }, [list.items, customAgent])
  console.log(error)
  return (
    <div
      className={`flex flex-col justify-center ${
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
        label={labelAutocomplete}
        placeholder='Seleccione'
        radius='sm'
        variant='faded'
        isLoading={list.isLoading}
        startContent={<Search className='w-4 h-4 dark:text-white' />}
        errorMessage={error !== '' && `(*) ${error}`}
        isInvalid={error !== ''}
      >
        {(item) => {
          return (
            <AutocompleteItem key={item.idcustoms_agent} textValue={item.name}>
              <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                  <Avatar
                    alt={item.name}
                    className='flex-shrink-0'
                    size='sm'
                    src={item.profile_gallery?.files[0]?.url ?? ''}
                  />
                  <div className='flex flex-col'>
                    <span className='text-small'>{item.name}</span>
                    <span className='text-tiny text-default-400'>
                      {item.email}
                    </span>
                    <span className='text-tiny text-default-500'>
                      {item.receiving_port.name}
                    </span>
                  </div>
                </div>
                <div>
                  {item?.country !== null && (
                    <Avatar
                      alt={`Bandera de ${item?.country?.country_name}`}
                      className='w-5 h-5'
                      src={`https://flagcdn.com/${item.country?.country_code
                        ?.toLowerCase()
                        .trim()}.svg`}
                    />
                  )}
                </div>
              </div>
            </AutocompleteItem>
          )
        }}
      </Autocomplete>
    </div>
  )
}

export default CustomAgentsAutocomplete
