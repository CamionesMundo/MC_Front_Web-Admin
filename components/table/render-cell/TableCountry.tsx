type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableCountry = ({ row }: Props) => {
  return (
    <div className='text-center dark:text-white'>
      {row?.country !== null ? row?.country.country_name : 'País no registrado'}
    </div>
  )
}

export { TableCountry }
