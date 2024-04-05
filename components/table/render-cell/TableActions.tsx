import { Delete, Edit } from '@/icons'
import { Tooltip } from '@nextui-org/react'
import React from 'react'

type Props = {
  onEdit: ((row: any) => void) | undefined
  onDelete: ((row: any) => void) | undefined
  row: any
}

const TableActions = ({ onEdit, onDelete, row }: Props) => {
  return (
    <div className='relative flex items-center justify-center gap-4'>
      <Tooltip content='Editar'>
        <span
          className='text-lg text-default-400 cursor-pointer active:opacity-50'
          onClick={() => {
            if (onEdit !== undefined) {
              onEdit(row.id)
            }
          }}
        >
          <Edit className='w-4 h-4' />
        </span>
      </Tooltip>
      <Tooltip color='danger' content='Eliminar'>
        <span
          className='text-lg text-danger cursor-pointer active:opacity-50'
          onClick={() => {
            if (onDelete !== undefined) {
              onDelete(row)
            }
          }}
        >
          <Delete className='w-4 h-4' />
        </span>
      </Tooltip>
    </div>
  )
}

export { TableActions }
