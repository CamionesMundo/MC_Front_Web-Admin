export interface CountryListItem {
  idcountry: number
  country_name: string
  country_code: string
  code: string
  createdAt: Date
  updatedAt: Date
}

export interface CityListItem {
  idcity: number
  city_name: string
  idcountry: number
  createdAt: Date
  updatedAt: Date
}
