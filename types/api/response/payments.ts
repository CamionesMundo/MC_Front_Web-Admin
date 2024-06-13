import { type WithId } from '.'
import { type Galleries } from './lots'

export type PaymentsResponse = {
  payments: PaymentsData[]
  totalRows: number
  totalPages: number
}

export type PaymentsData = {
  idpayment_order: number
  payment_id: string
  payment_date: Date | null
  confirmation_date: Date | null
  payment_status: boolean | null
  comment: null | string
  bank_reference: null | string
  createdAt: Date
  typesPaymentOrder: TypesPaymentOrder
  userAdmin: UserAdmin | null
  fileGallery: Galleries | null
}

export type TypesPaymentOrder = {
  name: string
}

export type UserAdmin = {
  name_user: string
}

export type PaymentsDataType = PaymentsData & WithId

export type PaymentStatusResponse = {
  idpayment_order: number
  payment_amount: string
  payment_id: string
  payment_status: boolean
  payment_method: string | null
  bank_reference: null
  internal_reference_mc: null
  file_voucher: null
  idtypes_payment_order: number
  iduser: number
  iduser_admin: number
  idorder: null
  idhome_payment: null
  idrent_payment: null
  idpublication: number
  idstory_payment: null
  payment_date: null
  confirmation_date: Date
  comment: string
  createdAt: Date
  updatedAt: Date
}
