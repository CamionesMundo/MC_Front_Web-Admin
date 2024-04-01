import { type ReactNode } from 'react'

export type ColumnsProps = {
  key: string
  display: string
  render?: (data: any) => ReactNode
}
