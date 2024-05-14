import {
  type PaymentType,
  type LanguagePreference,
  type LotStatus,
  type TypeAuctionStatus
} from '@/types/enums'
import {
  type UserResponse,
  type CityListItem,
  type CountryListItem,
  type WithId
} from '.'

export type LotResponse = {
  idlot: number
  lot_code: string
  transmission_date: Date
  end_date: Date | null
  actionner: number
  status: LotStatus
  active: boolean
  streaming_url: string
  createdAt: Date
  updatedAt: Date
  lot_total: string
  user_actionner: UserResponse
}

export type RoleActionner = {
  idrole_admin: number
  name_role: string
}

export type FileProfileActionner = {
  url: string | null
  thumbnail: string | null
}

export type LotsDataType = LotResponse & WithId

export type AuctionPublicationResponse = {
  publications: AuctionsResponse[]
  totalRows: number
  totalPages: number
}
export type AuctionsDataType = AuctionsResponse & WithId

export type AuctionsResponse = {
  idpublication: number
  idvehicle: number
  idauctions: number
  idrentals: null
  active: boolean
  rate_star: number
  iduser: number
  type_publication: number
  idlikes: number
  idfavorites: number
  idshares: number
  publication_code: string
  order_made: null
  draft: boolean
  promotion: null
  createdAt: Date
  vehicle: VehicleResponse
  user: PublicationUserResponse
  auction: AuctionResponse
}

export type AuctionResponse = {
  idauctions: number
  start_date: Date
  end_date: Date
  starting_price: string
  increase_bids: string
  idaddress: number
  mechanical_inspection_mc: boolean
  file_mechanical_inspection: number
  auction_insurance_amount: string
  mechanical_inspection_amount: string
  service_fee_amount: string
  payment_type: PaymentType
  type_auction: number
  payment_status: boolean | null
  idtype_status: number
  createdAt: Date
  updatedAt: Date
  type: Type
  type_status: TypeStatus
  bids: BidResponse[]
}

export type BidResponse = {
  idbids: number
  auctionId: number
  user_id: number
  amount: number
  createdAt: Date
  updatedAt: Date
  isWinner: boolean
  vehicleAttached: boolean
  vehicle_id: number | null
  user: BidUser
}

export type BidUser = {
  iduser: number
  username: string
  name: string
  surname: string
}

export type Type = {
  idapptype: number
  type_name: string
}

export type TypeStatus = {
  idapptype: number
  type_name: TypeAuctionStatus
  createdAt: Date
  updatedAt: Date
}

export type PublicationUserResponse = {
  iduser: number
  username: string
  user_type: number
  rate_star: number
  idaddress: number
  lang: LanguagePreference
  user_type_data: Type
  file_profile: FileProfile | null
}

export type FileProfile = {
  url: string
  thumbnail: null
  name: string
}

export type VehicleResponse = {
  idvehicle: number
  file_gallery: number
  name_vehicle: string
  sale_price: string
  accept_counteroffer: boolean
  gift_description: string
  gift_photos: number | null
  idvehicle_model: number
  year_vehicle: string
  idvehicle_general_condition: number
  idvehicle_fuel: number
  idvehicle_colors: number
  video: number | null
  idcity: number
  idvehicle_brand: number | null
  idvehicle_model_submodel: number | null
  idcheck_list: number | null
  vehicle_subtype: VehicleSubtypeClass
  vehicle_model: VehicleModel
  vehicle_brand: VehicleVehicleBrand | null
  vehicle_submodel: VehicleSubmodel | null
  city: CityAuction | null
  vehicle_general_condition: VehicleFuelClass
  powertrains: Powertrains
  vehicle_fuel: VehicleFuelClass
  vehicle_colors: VehicleColors
  photo_galleries: Galleries
  video_galleries: Galleries | null
  gift_galleries: Galleries | null
  documentation_galleries: Galleries | null
  check_list: CheckList | null
}

export type CheckList = {
  idcheck_list: number
  engine_status: string
  transmission_status: string
  hydraulic_system_status: string
  pto_status: string
  alternator_status: string
  battery_status: null | string
  starter_motor_status: string
  differential_status: string
  brake_status: null | string
  parking_brake_status: null | string
  retarder_brake_status: string
  steering_status: string
  lights_status: null | string
  electrical_wiring_status: null | string
  windshield_status: string
  side_glass_status: null | string
  rearview_mirror_status: string
  cabin_door_status: null | string
  chassis_status: string
  suspension_status: string
  general_electric_system_status: null | string
  dashboard_status: null | string
  radio_status: null | string
  tachograph_status: null
  seat_status: null | string
  air_conditioning_status: null | string
  createdAt: Date
  updatedAt: Date
}

export type CityAuction = CityListItem & { country: CountryListItem }

export type Galleries = {
  idgallery: number
  files: FileGallery[]
}

export type FileGallery = {
  idfile: number
  url: string
  thumbnail: null | string
  idgallery: number
  name: string
}

export type Powertrains = {
  idpowertrain: number
  idvehicle: number
  vehicle_transmission: VehicleTransmission
}

export type VehicleTransmission = {
  idvehicle_transmission: number
  transmission_name: string
  transmission_name_en: string
  transmission_name_es: string
}

export type VehicleVehicleBrand = {
  idvehicle_brand: number
  brand_name: string
  createdAt: Date
  updatedAt: Date
}

export type VehicleColors = {
  idvehicle_colors: number
  name: string
  name_en: string
  name_es: string
  hex_color: string
  createdAt: Date
  updatedAt: Date
}

export type VehicleFuelClass = {
  idvehicle_fuel?: number
  name: string
  name_en: string
  name_es: string
  idvehicle_general_condition?: number
}

export type VehicleModel = {
  idvehicle_model: number
  model_name: string
  idvehicle_brand: number
  vehicle_brand: VehicleModelVehicleBrand
}

export type VehicleModelVehicleBrand = {
  idvehicle_brand: number
  brand_name: string
}

export type VehicleSubmodel = {
  idvehicle_model_submodel: number
  submodel_name: string
  idvehicle_model: number
  createdAt: Date
  updatedAt: Date
}

export type VehicleSubtypeClass = {
  idvehicle_subtype?: number
  name: string
  name_en: string
  name_es: string
  idvehicle_types: number
  createdAt: Date
  updatedAt: Date
  vehicle_types?: VehicleSubtypeClass
  image?: string
}

export type Lot = LotResponse & {
  lot_queues: LotQueues[]
}

export type LotFullDataResponse = {
  lot_information: LotInformation
  lot: Lot
}
export type LotInformation = {
  lot_total: number
  missing: number
  sold: number
  no_bidder: number
}

export type LotQueues = {
  idlot_queue: number
  order: number
  idlot: number
  current: boolean
  idpublication: number
  createdAt: Date
  updatedAt: Date
  publication: AuctionsResponse
}
