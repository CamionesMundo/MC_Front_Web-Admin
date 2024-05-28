import { type Key, type ReactNode } from 'react'

export type TabItem = {
  key: Key
  title: string | ReactNode
  content: ReactNode
}
