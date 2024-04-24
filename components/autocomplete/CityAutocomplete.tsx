'use client'
import { type CityListItem } from '@/types/api/response/country'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { useFilter } from '@react-aria/i18n'
import { useAsyncList } from '@react-stately/data'
import React, { useState, type Key, useEffect } from 'react'

/**
 * The `CityAutocomplete` component provides a user interface for selecting cities
 * via an autocomplete field. This component uses the city API based on the selected country
 * and allows for dynamic city selection by filtering based on user input.
 *
 * Props:
 * @param {number | undefined} countryId - The ID of the country for which cities will be loaded. If `undefined`, no cities will be loaded.
 * @param {CityListItem | undefined} currentCity - The currently selected city, if any.
 * @param {(city: CityListItem | undefined) => void} changeCity - Callback function that is invoked when a new city is selected.
 * @param {string} [error] - Optional error message to display in the component in case of an error during the operation.
 *
 * Behavior:
 * - Utilizes `useAsyncList` to manage asynchronous loading and handling of the city list.
 * - Filters available cities based on user input.
 * - Allows for clear selection and display of a previously selected city.
 * - Displays appropriate error messages in case of errors during selection or data loading.
 *
 * This component is useful in forms where city selection is required based on country selection.
 */

type CityAutocompleteProps = {
  countryId: number | undefined
  currentCity: CityListItem | undefined
  changeCity: (city: CityListItem | undefined) => void
  error?: string
}

type FieldState = {
  selectedKey: Key | null
  inputValue: string
  currentCity: CityListItem | undefined
  items: CityListItem[]
}

const CityAutocomplete = ({
  countryId,
  currentCity: city,
  changeCity,
  error
}: CityAutocompleteProps) => {
  const [fieldState, setFieldState] = useState<FieldState>({
    selectedKey: '',
    inputValue: '',
    currentCity: city,
    items: []
  })

  const list = useAsyncList<CityListItem>({
    async load ({ signal }) {
      if (countryId === undefined) return { items: [] }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/core/cities/${countryId}`,
        {
          signal
        }
      )
      const json = await res.json()
      return { items: json.data }
    }
  })

  useEffect(() => {
    if (countryId !== undefined) {
      list.reload()
      setFieldState((prevState) => ({
        ...prevState,
        inputValue: '',
        selectedKey: ''
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryId])

  useEffect(() => {
    if (city === undefined) {
      setFieldState({
        selectedKey: '',
        inputValue: '',
        currentCity: city,
        items: list.items
      })
    }
  }, [city, list.items])

  const filter = useFilter({ sensitivity: 'base' })

  const onSelectionChange = (key: Key) => {
    setFieldState((prevState) => {
      const selectedItem = prevState.items.find(
        (option) => option.idcity.toString() === (key as string)
      )

      const cityName = selectedItem !== undefined ? selectedItem.city_name : ''
      return {
        ...prevState,
        inputValue: cityName,
        selectedKey: key,
        currentCity: selectedItem
      }
    })
    const filtered = list.items.find(
      (item) => item.idcity.toString() === (key as string)
    )
    changeCity(filtered)
  }

  const onInputChange = (value: string) => {
    if (value === '') {
      setFieldState((prevState) => ({
        inputValue: value,
        currentCity: undefined,
        selectedKey: value === '' ? null : prevState.selectedKey,
        items: list.items
      }))
      return
    }
    setFieldState((prevState) => ({
      inputValue: value,
      currentCity: undefined,
      selectedKey: value === '' ? null : prevState.selectedKey,
      items: list.items.filter((item) =>
        filter.startsWith(item.city_name, value)
      )
    }))
  }

  useEffect(() => {
    if (list.items.length > 0 && city?.city_name !== undefined) {
      setFieldState({
        inputValue: city.city_name,
        currentCity: city,
        selectedKey: city.idcity.toString(),
        items: list.items
      })
    } else {
      setFieldState({
        inputValue: '',
        currentCity: undefined,
        selectedKey: '',
        items: list.items
      })
    }
  }, [list.items, city])

  return (
    <div
      className={`flex flex-col justify-center ${error !== '' ? 'mt-4' : ''}`}
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
        label={'Ciudad'}
        placeholder='Seleccione'
        radius='sm'
        variant='faded'
        isLoading={list.isLoading}
      >
        {(item) => {
          return (
            <AutocompleteItem key={item.idcity} textValue={item.city_name}>
              {item.city_name}
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

export default CityAutocomplete
