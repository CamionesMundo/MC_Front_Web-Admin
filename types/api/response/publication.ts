import {
  type PublicationType,
  type AuctionType,
  type CheckListStatus
} from '@/types/enums'
import { type WithId, type CityListItem, type CountryListItem } from '.'

export type PublicationResponse = {
  idpublication: number
  idvehicle: number
  idauctions: number | null
  idrentals: number | null
  active: boolean
  rate_star: number | null
  iduser: number | null
  type_publication: PublicationType | null
  idlikes: number | null
  idfavorites: number | null
  idshares: number | null
  publication_code: string | null
  order_made: null
  draft: boolean
  promotion: boolean | null
  id_lots: null
  createdAt: Date
  updatedAt: Date
  vehicle: PublicationVehicle
  auction: PublicationAuction
  lot?: LotAuction | null
}
export type LotAuction = {
  idlot: number
  lot_code: string
}
export type PublicationAuction = {
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
  payment_type: string
  type_auction: AuctionType
  payment_status: boolean
  idtype_status: number
  createdAt: Date
  updatedAt: Date
  type_status: TypeStatus
  bids: BidAuction[]
}

export type BidAuction = {
  idbids: number
  auctionId: number
  user_id: number
  amount: number
  createdAt: Date
  updatedAt: Date
  isWinner: boolean
  vehicleAttached: boolean
  vehicle_id: number | null
  user: User
}

export type User = {
  iduser: number
  username: string
  name: string
  surname: string
  country: CountryListItem
}
export type TypeStatus = {
  idapptype: number
  type_name: string
  createdAt: Date
  updatedAt: Date
}

export type PublicationVehicle = {
  idvehicle: number
  file_gallery: number
  name_vehicle: string
  sale_price: string
  accept_counteroffer: boolean
  gift_purchase: boolean
  gift_description: string
  gift_photos: number
  vehicle_description: string
  mileage: string
  vin: string
  idvehicle_subtype: number
  idvehicle_model: number
  year_vehicle: string
  idvehicle_general_condition: number
  weight: string | null
  idvehicle_fuel: number
  horsepower: string
  idvehicle_colors: number
  file_documentation: null
  video: number
  idcity: number
  idvehicle_brand: number
  idvehicle_model_submodel: number
  idcheck_list: number | null
  createdAt: Date
  updatedAt: Date
  vehicle_subtype: VehicleSubtypeClass
  city: CityAuction
  vehicle_model: VehicleModel
  vehicle_brand: VehicleBrand
  vehicle_submodel: VehicleSubmodel
  vehicle_general_condition: VehicleConditions
  vehicle_fuel: VehicleFuel
  vehicle_colors: VehicleColors
  dimensions: Dimensions
  powertrains: Powertrains
  cabins: Cabins
  chassis: Chassis
  axles_tires: AxlesTires
  other_specifications: OtherSpecifications
  photo_galleries: Galleries
  video_galleries: Galleries
  gift_galleries: Galleries
  documentation_galleries: Galleries
  check_list: CheckListVehicle | null
}

export type CheckListVehicle = {
  idcheck_list: number
  engine_status: CheckListStatus
  transmission_status: CheckListStatus
  hydraulic_system_status: CheckListStatus
  pto_status: CheckListStatus
  alternator_status: CheckListStatus
  battery_status: CheckListStatus
  starter_motor_status: CheckListStatus
  differential_status: CheckListStatus
  brake_status: CheckListStatus
  parking_brake_status: CheckListStatus
  retarder_brake_status: CheckListStatus
  steering_status: CheckListStatus
  lights_status: CheckListStatus
  electrical_wiring_status: CheckListStatus
  windshield_status: CheckListStatus
  side_glass_status: CheckListStatus
  rearview_mirror_status: CheckListStatus
  cabin_door_status: CheckListStatus
  chassis_status: CheckListStatus
  suspension_status: CheckListStatus
  general_electric_system_status: CheckListStatus
  dashboard_status: CheckListStatus
  radio_status: CheckListStatus
  tachograph_status: CheckListStatus
  seat_status: CheckListStatus
  air_conditioning_status: CheckListStatus
  createdAt: Date
  updatedAt: Date
}

export type CityAuction = CityListItem & { country: CountryListItem }
export type AxlesTires = {
  idaxle_tire: number
  idvehicle: number
  idvehicle_suspension: number
  idvehicle_tire_size: number
  tire_size: string
  createdAt: Date
  updatedAt: Date
  vehicle_suspension: VehicleSuspensionClass
  vehicle_tire_size: VehicleTireSize
}

export type VehicleSuspensionClass = {
  idvehicle_suspension?: number
  name: string
  createdAt: Date
  updatedAt: Date
  idvehicle_axle_confi?: number
  idvehicle_emiss?: number
  idvehicle_engine_brand?: number
}

export type VehicleTireSize = {
  idvehicle_tire_size: number
  size: string
  createdAt: Date
  updatedAt: Date
}

export type Cabins = {
  idcabin: number
  idvehicle_cabin_types: number
  cruise_control: boolean
  tachograph: boolean
  digital_tachograph: boolean
  air_conditioning: boolean
  stationary_heating: boolean
  color: null
  idvehicle: number
  createdAt: Date
  updatedAt: Date
  vehicle_cabin_types: VehicleGenericData
}

export type VehicleGenericData = {
  name: string
  name_en: string
  name_es: string
  createdAt: Date
  updatedAt: Date
}

export type VehicleConditions = VehicleGenericData & {
  idvehicle_general_condition: number
}

export type VehicleFuel = VehicleGenericData & {
  idvehicle_fuel: number
}

export type VehicleCabinType = VehicleGenericData & {
  idvehicle_cabin_types: number
}

export type Chassis = {
  idchassis: number
  number_axles: number
  idvehicle_axle_configuration: number
  kerb_weight: string
  gross_vehicle_weight: string
  total_fuel_capacity: string
  auxiliary_fuel_tank: boolean
  fifth_wheel_height: null
  suspension_type: string
  idvehicle: number
  createdAt: Date
  updatedAt: Date
  vehicle_axle_configuration: VehicleSuspensionClass
}

export type Dimensions = {
  iddimension: number
  total_length: number
  total_width: number
  total_height: number
  idvehicle: number
  createdAt: Date
  updatedAt: Date
}

export type Galleries = {
  idgallery: number
  files: FileGallery[]
}

export type FileGallery = {
  idfile: number
  url: string
  thumbnail?: null | undefined
  idgallery: number
  name: string
  main_file?: boolean | undefined
}

export type OtherSpecifications = {
  idother_specification: number
  idvehicle: number
  additional_driver: boolean
  seat_availability: boolean
  gps: boolean
  radio: boolean
  air_conditioning: null
  led_lights: boolean
  spare_tires: boolean
  warranty: boolean
  shipping_conditions: boolean
  information_real: boolean
  createdAt: Date
  updatedAt: Date
}

export type Powertrains = {
  idpowertrain: number
  idvehicle: number
  idvehicle_engine_brand: number
  engine_displacement: string
  idvehicle_emissions_standards: number
  idvehicle_transmission: number
  number_speeds: number
  power_steering: boolean
  abs: boolean
  asr: boolean
  createdAt: Date
  updatedAt: Date
  vehicle_transmission: VehicleTransmission
  vehicle_emissions_standards: VehicleSuspensionClass
  vehicle_engine_brand: VehicleSuspensionClass
}

export type VehicleTransmission = {
  idvehicle_transmission: number
  transmission_name: string
  transmission_name_en: string
  transmission_name_es: string
  createdAt: Date
  updatedAt: Date
}

export type VehicleBrand = {
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

export type VehicleModel = {
  idvehicle_model: number
  model_name: string
  idvehicle_brand: number
  createdAt: Date
  updatedAt: Date
  vehicle_brand: VehicleBrand
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

export type AuctionsFiltersResponse = {
  publications: PublicationResponse[]
  totalRows: number
  totalPages: number
}

export type AuctionFilterDataType = PublicationResponse & WithId

export type PublicationFiltersResponse = {
  publications: GeneralPublicationResponse[]
  totalRows: number
  totalPages: number
}

export type GeneralPublicationResponse = Omit<
PublicationResponse,
'updatedAt' | 'auction' | 'lot'
>

export type GeneralPublicationDataType = GeneralPublicationResponse & WithId
