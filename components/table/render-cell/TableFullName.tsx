type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableFullName = ({ row }: Props) => {
  return <div className='text-start'>{`${row?.name} ${row?.surname}`}</div>
}

export { TableFullName }
