import { type ChatMemberType } from '../enums'

export type ChatMember = {
  id: string
  name: string | null | undefined
  role: string | null | undefined
  urlAvatar: string | undefined | null
  chatMemberType: ChatMemberType
  isLocalUser?: boolean
}
