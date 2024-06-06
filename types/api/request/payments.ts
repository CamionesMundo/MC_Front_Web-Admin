export type PaymentCommentRequest = {
  comment: string
}

export type BodyPayments = {
  id: number
  data: PaymentCommentRequest
}

export type PaymentsFilter = {
  page: number
  pageSize: number
  query: string
  startDate: string | undefined
  endDate: string | undefined
}
