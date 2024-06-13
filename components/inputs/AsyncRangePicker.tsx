import useQueryParams from '@/hooks/useQueryParams'
import { useResponsive } from '@/hooks/useResponsive'
import { convertDateIsoFormat } from '@/lib/utils/utils'
import { getLocalTimeZone, parseDate } from '@internationalized/date'
import {
  DateRangePicker,
  type DateValue,
  type RangeValue
} from '@nextui-org/react'
import { useDateFormatter } from '@react-aria/i18n'
import { DateTime } from 'luxon'
import React, { useCallback, useEffect, useState } from 'react'

type AsyncRangePickerProps = {
  label?: string
}

const AsyncRangePicker = ({ label = 'Fecha: ' }: AsyncRangePickerProps) => {
  const isMobile = useResponsive()
  const { queryParams: search, setQueryParams } = useQueryParams()
  const startDate = convertDateIsoFormat(search.get('startDate') ?? '')
  const endDate = convertDateIsoFormat(search.get('endDate') ?? '')
  const formatter = useDateFormatter({ dateStyle: 'short' })
  const [value, setValue] = useState<RangeValue<DateValue> | null>(
    startDate !== undefined && endDate !== undefined
      ? {
          start: parseDate(startDate ?? ''),
          end: parseDate(endDate ?? '')
        }
      : null
  )

  const handleChange = useCallback(
    (value: RangeValue<DateValue> | null) => {
      if (value === null) {
        setValue(null)
        setQueryParams({ page: 1, startDate: undefined, endDate: undefined })
        return
      }
      const dateStart = formatter.format(value.start.toDate(getLocalTimeZone()))
      const start = DateTime.fromFormat(dateStart, 'd/M/yy')
      const newFormatStart = start.toFormat('MM-dd-yyyy')
      const dateEnd = formatter.format(value.end.toDate(getLocalTimeZone()))

      const end = DateTime.fromFormat(dateEnd, 'd/M/yy')
      const newFormatEnd = end.toFormat('MM-dd-yyyy')
      setValue(value)
      setQueryParams({
        page: 1,
        startDate: newFormatStart,
        endDate: newFormatEnd
      })
    },
    [formatter, setQueryParams]
  )

  useEffect(() => {
    const startDate = search.get('startDate')
    const endDate = search.get('endDate')
    if (startDate === null && endDate === null) {
      setValue(null)
      setQueryParams({
        startDate: undefined,
        endDate: undefined
      })
    }
  }, [search, setQueryParams])
  return (
    <>
      <DateRangePicker
        label={label}
        value={value}
        variant='faded'
        visibleMonths={isMobile ? 1 : 2}
        pageBehavior='single'
        color='primary'
        labelPlacement={isMobile ? 'outside' : 'outside-left'}
        onChange={handleChange}
        classNames={{
          base: 'w-full max-w-full',
          label:
            'text-blackText placeholder:text-blackText/50 font-semibold dark:text-white md:max-w-[120px] w-max',
          selectorIcon: 'dark:text-white',
          inputWrapper:
            'border border-[#e0e0e0] dark:hover:border-white data-[hover=true]:cursor-not-allowed'
        }}
      />
    </>
  )
}

export default AsyncRangePicker
