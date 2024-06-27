export type OrderFilter = {
  page: number
  pageSize: number
  query: string
  idOrderStatus: number
  startDate: string | undefined
  endDate: string | undefined
}

export type BodyHistoryStatus = {
  id: number | undefined
  data: HistoryStatusData
}

export type HistoryStatusData = {
  tracking?: string | undefined
  status?: boolean | undefined
  idnotify_shipment?: number | undefined
  file?: FileDocument[] | undefined
}

export type FileDocument = {
  file: string | null
  name: string | null
}

export type BodyUpdateOrder = {
  idcustoms_agent?: number | undefined
  idcustoms_agent_port_origin?: number | undefined
}

export type RequestUpdateOrder = {
  id: number
  body: BodyUpdateOrder
}

export type BodyDeleteOrder = {
  reason: string
}

export type RequestDeleteOrder = {
  id: number
  body: BodyDeleteOrder
}
