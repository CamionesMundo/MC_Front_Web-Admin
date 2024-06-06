export type BodyActivePublication = {
  id: number
  active: boolean
}

export type ParamsFilter = {
  page: number
  pageSize: number
  query: string
  typeStatus: number
  typeAuction: number
  startDate: string | undefined
  endDate: string | undefined
}

export type ParamsPostFilter = Omit<ParamsFilter, 'typeStatus' | 'typeAuction'>
