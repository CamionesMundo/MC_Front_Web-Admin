'use client'
import { type CountryListItem } from '@/types/api/response/country'
import { Autocomplete, AutocompleteItem, Avatar } from '@nextui-org/react'
import { useFilter } from '@react-aria/i18n'
import { useAsyncList } from '@react-stately/data'
import React, { useState, type Key, useEffect, useCallback } from 'react'

type CountryAutocompleteProps = {
  currentCountry: CountryListItem | null | undefined
  changeCountry: (country: CountryListItem | undefined) => void
  error?: string
}

type FieldState = {
  selectedKey: Key | null
  inputValue: string
  currentCountry: CountryListItem | undefined | null
  items: CountryListItem[]
}

const CountryAutocomplete = ({
  currentCountry: country,
  changeCountry,
  error
}: CountryAutocompleteProps) => {
  const [fieldState, setFieldState] = useState<FieldState>({
    selectedKey: '',
    inputValue: '',
    currentCountry: country,
    items: []
  })

  const list = useAsyncList<CountryListItem>({
    async load ({ signal }) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/core/countries`,
        {
          signal
        }
      )
      const json = await res.json()
      return { items: json.data }
    }
  })

  const filter = useFilter({ sensitivity: 'base' })

  const onSelectionChange = useCallback(
    (key: Key) => {
      setFieldState((prevState) => {
        const selectedItem = prevState.items.find(
          (option) => option.idcountry.toString() === (key as string)
        )

        const countryName =
          selectedItem !== undefined ? selectedItem.country_name : ''

        return {
          ...prevState,
          inputValue: countryName,
          selectedKey: key,
          currentCountry: selectedItem
        }
      })
      const filtered = list.items.find(
        (item) => item.idcountry.toString() === (key as string)
      )
      changeCountry(filtered)
    },
    [changeCountry, list.items]
  )

  const onInputChange = (value: string) => {
    if (value === '') {
      setFieldState((prevState) => ({
        inputValue: value,
        currentCountry: undefined,
        selectedKey: value === '' ? null : prevState.selectedKey,
        items: list.items
      }))
      return
    }
    setFieldState((prevState) => ({
      inputValue: value,
      currentCountry: undefined,
      selectedKey: value === '' ? null : prevState.selectedKey,
      items: list.items.filter((item) =>
        filter.startsWith(item.country_name, value)
      )
    }))
  }

  useEffect(() => {
    if (list.items.length > 0 && country?.country_name !== undefined) {
      setFieldState({
        inputValue: country?.country_name,
        currentCountry: country,
        selectedKey: country?.idcountry.toString(),
        items: list.items
      })
    } else {
      setFieldState({
        inputValue: '',
        currentCountry: undefined,
        selectedKey: '',
        items: list.items
      })
    }
  }, [list.items, country])

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
        color='primary'
        label={'País'}
        placeholder='Seleccione'
        radius='sm'
        variant='faded'
        isLoading={list.isLoading}
      >
        {(item) => {
          const countryCode = item.country_code.toLowerCase().trim()

          return (
            <AutocompleteItem
              key={item.idcountry}
              textValue={item.country_name}
              startContent={
                <Avatar
                  alt={`Bandera de ${item.country_name}`}
                  className='w-6 h-6'
                  src={`https://flagcdn.com/${countryCode}.svg`}
                />
              }
            >
              {item.country_name}
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

export default CountryAutocomplete
