import { Delete, Edit, Visible } from '@/icons'
import { type ActionsPermissions } from '@/types/ui/table'
import { Tooltip } from '@nextui-org/react'
import React from 'react'

type Props = {
  onViewMore: ((id: number) => void) | undefined
  onEdit: ((id: number) => void) | undefined
  onDelete: ((id: number) => void) | undefined
  id: number
  actions: ActionsPermissions
}

const TableActions = ({ onViewMore, onEdit, onDelete, id, actions }: Props) => {
  return (
    <div className='relative flex items-center justify-center gap-4'>
      {actions.useViewMore && (
        <Tooltip content='Ver Detalles' color='foreground'>
          <span
            className='text-lg text-default-400 cursor-pointer active:opacity-50'
            onClick={() => {
              if (onViewMore !== undefined) {
                onViewMore(id)
              }
            }}
          >
            <Visible className='w-4 h-4' />
          </span>
        </Tooltip>
      )}
      {actions.useEdit && (
        <Tooltip content='Editar' color='foreground'>
          <span
            className='text-lg text-default-400 cursor-pointer active:opacity-50'
            onClick={() => {
              if (onEdit !== undefined) {
                onEdit(id)
              }
            }}
          >
            <Edit className='w-4 h-4' />
          </span>
        </Tooltip>
      )}
      {actions.useDelete && (
        <Tooltip color='danger' content='Eliminar'>
          <span
            className='text-lg text-danger cursor-pointer active:opacity-50'
            onClick={() => {
              if (onDelete !== undefined) {
                onDelete(id)
              }
            }}
          >
            <Delete className='w-4 h-4' />
          </span>
        </Tooltip>
      )}
    </div>
  )
}

export { TableActions }
