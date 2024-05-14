import { type ReactNode } from 'react'

export type ColumnsProps = {
  key: string
  display: string
}

export type ActionsPermissions = {
  useViewMore: boolean
  useEdit: boolean
  useDelete: boolean
  iconDelete?: ReactNode | undefined
  labelDelete?: string | undefined
}
