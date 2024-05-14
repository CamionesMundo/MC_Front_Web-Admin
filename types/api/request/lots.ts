import { type LotStatus } from '@/types/enums'

export type BodyLotForm = {
  transmission_date: string
  actionner: number
  status: LotStatus
  active: boolean
  streaming_url: string | null
  publications: BodyLotPublication[]
}

export type BodyLotPublication = {
  idpublication: number
  order: number | null
  status: boolean
}

export type BodyUpdateLotForm = {
  id: number
  data: BodyLotForm
}
