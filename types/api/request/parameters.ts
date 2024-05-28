export type AppParameterRequest = {
  value: number | null
  value_str: string | null
}

export type BodyParameters = {
  id: number
  data: AppParameterRequest
}
