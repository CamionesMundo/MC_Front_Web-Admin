'use client'
import { BASE_ADMIN_URL } from '@/const/base-url'
import { Search } from '@/icons'
import api from '@/lib/axios/axios-client'
import { type GenericResponse } from '@/types/api'
import { type UserResponse } from '@/types/api/response/auth'
import { Autocomplete, AutocompleteItem, Avatar } from '@nextui-org/react'
import { useFilter } from '@react-aria/i18n'
import { useAsyncList } from '@react-stately/data'
import React, { useState, type Key, useEffect } from 'react'

/**
 * The `AdminsAutocomplete` component provides a user interface for selecting administrators
 * via an autocomplete field. This component fetches the list of administrators from the API
 * and allows for dynamic selection by filtering based on user input.
 *
 * Props:
 * @param {UserResponse | null | undefined} currentAdmin - The currently selected administrator, if any.
 * @param {(admin: UserResponse | undefined) => void} changeAdmin - Callback function that is invoked when a new administrator is selected.
 * @param {string} [error] - Optional error message to display in the component in case of an error during the operation.
 *
 * Behavior:
 * - Utilizes `useAsyncList` to manage asynchronous loading and handling of the administrator list.
 * - Filters available administrators based on user input.
 * - Allows for clear selection and display of a previously selected administrator.
 * - Displays appropriate error messages in case of errors during selection or data loading.
 *
 * This component is useful in forms where administrator selection is required.
 */
type AdminsAutocompleteProps = {
  currentAdmin: UserResponse | null | undefined
  changeAdmin: (admin: UserResponse | undefined) => void
  error?: string
}
type FieldState = {
  selectedKey: Key | null
  inputValue: string
  currentAdmin: UserResponse | undefined | null
  items: UserResponse[]
}
const AdminsAutocomplete = ({
  currentAdmin: admin,
  changeAdmin,
  error
}: AdminsAutocompleteProps) => {
  const [fieldState, setFieldState] = useState<FieldState>({
    selectedKey: '',
    inputValue: '',
    currentAdmin: admin,
    items: []
  })

  const list = useAsyncList<UserResponse>({
    async load ({ signal }) {
      try {
        const response = await api.get<GenericResponse<UserResponse[]>>(
          BASE_ADMIN_URL,
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
    if (admin === undefined) {
      setFieldState({
        selectedKey: '',
        inputValue: '',
        currentAdmin: admin,
        items: list.items
      })
    }
  }, [admin, list.items])

  const filter = useFilter({ sensitivity: 'base' })

  const onSelectionChange = (key: Key | null) => {
    if (key === null) {
      setFieldState((prevState) => ({
        ...prevState,
        inputValue: '',
        selectedKey: null,
        currentAdmin: undefined
      }))
      changeAdmin(undefined)
      return
    }

    setFieldState((prevState) => {
      const selectedItem = prevState.items.find(
        (option) => option.iduser_admin.toString() === (key as string)
      )

      const adminName = selectedItem !== undefined ? selectedItem.name_user : ''
      return {
        ...prevState,
        inputValue: adminName,
        selectedKey: key,
        currentAdmin: selectedItem
      }
    })
    const filtered = list.items.find(
      (item) => item.iduser_admin.toString() === (key as string)
    )
    changeAdmin(filtered)
  }

  const onInputChange = (value: string) => {
    if (value === '') {
      setFieldState((prevState) => ({
        inputValue: value,
        currentAdmin: undefined,
        selectedKey: value === '' ? null : prevState.selectedKey,
        items: list.items
      }))
      return
    }
    setFieldState((prevState) => ({
      inputValue: value,
      currentAdmin: undefined,
      selectedKey: value === '' ? null : prevState.selectedKey,
      items: list.items.filter((item) =>
        filter.startsWith(item.name_user, value)
      )
    }))
  }
  useEffect(() => {
    if (list.items.length > 0 && admin?.name_user !== undefined) {
      setFieldState({
        inputValue: admin.name_user,
        currentAdmin: admin,
        selectedKey: admin.iduser_admin.toString(),
        items: list.items
      })
    }
  }, [list.items, admin])

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
            inputWrapper: `border rounded-xl dark:text-white ${
              error !== ''
                ? 'border-danger'
                : 'border-[#e0e0e0] dark:data-[hover=true]:border-white dark:focus-whithin:border-white'
            }`,
            label: 'font-semibold dark:text-white'
          }
        }}
        color={error !== '' ? 'danger' : 'primary'}
        label={'Administrador'}
        placeholder='Seleccione'
        radius='sm'
        variant='faded'
        isLoading={list.isLoading}
        startContent={<Search className='w-4 h-4 dark:text-white' />}
      >
        {(item) => {
          return (
            <AutocompleteItem
              key={item.iduser_admin}
              textValue={item.name_user}
            >
              <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                  <Avatar
                    alt={item.name_user}
                    className='flex-shrink-0'
                    size='sm'
                    src={item.file_profile?.url ?? ''}
                  />
                  <div className='flex flex-col'>
                    <span className='text-small'>{item.name_user}</span>
                    <span className='text-tiny text-default-400'>
                      {item.role.name_role}
                    </span>
                  </div>
                </div>
              </div>
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

export default AdminsAutocomplete
