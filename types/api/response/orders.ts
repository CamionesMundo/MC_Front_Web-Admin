import { type CustomAgentsResponse, type AddressBaseData, type WithId } from '.'
import { type PublicationResponse } from './publication'
import { type FileProfiles, type BaseUserData } from './user'

export type OrderResponse = {
  idorder: number
  apply_offer: boolean
  insurance_name: string
  number_order: string | null
  order_amount: string
  active: boolean | null
  iduser_buyer: number
  idpublication: number
  id_address: number | null
  type_shopping: number
  idcustoms_agent: number | null
  idcustoms_agent_port_origin: number | null
  createdAt: Date
  updatedAt: Date
  address: AddressBaseData | null
  appType: OrderAppType
  customsAgent: CustomAgentsResponse | null
  customs_agent_port_origin: CustomAgentsResponse | null
  publication: PublicationResponse
  history: OrderHistory[]
}

export type OrderAppType = {
  idapptype: number
  type_name: string
  createdAt: Date
  updatedAt: Date
}

export type OrderListResponse = {
  orders: OrderResponse[]
  totalRows: number
  totalPages: number
}

export type OrderHistory = {
  idorder_status: number
  orderStatus: OrderStatusInHistory
}

export type OrderStatusInHistory = {
  name_status: string
}

export type OrderDataType = OrderResponse & WithId

export type OrderStatusResponse = {
  idorder_status: number
  name_status: string
  description: string
  order_type: string
  order: number
  createdAt: Date
  updatedAt: Date
}
export type TrackingHistory = {
  idhistory_status: number
  tracking: string | null
  status: boolean
  file_report: number | null
  idnotify_shipment: number | null
  idorder: number
  idorder_status: number
  notify_shipment: NotifyShipment | null
  orderStatus: OrderStatusResponse
}
export type NotifyShipment = {
  idnotify_shipment: number
  url: string | null
  name_company: string | null
  reception_date: Date | null
}
export type OrderDetailResponse = Omit<
OrderResponse,
'publication' | 'appType' | 'history'
> & {
  publication: FullPublication
  payment: PaymentOrder[]
  buyer: BaseUserData
  history: TrackingHistory[]
}

export type PaymentOrder = {
  payment_amount: string
  payment_status: boolean | null
  typesPaymentOrder: TypesPaymentOrder
}

export type TypesPaymentOrder = {
  name: string
}

export type UserPublication = {
  iduser: number
  username: string
  file_profile_picture: number | null
  active: boolean
  rate_star: number
  lang: string
  file_profile_picture_data: FileProfiles | null
}
export type FullPublication = PublicationResponse & { user: UserPublication }
