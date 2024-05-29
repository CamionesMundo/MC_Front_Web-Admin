import { getAmountBid } from '@/helpers/api/bids'
import { useQuery } from '@tanstack/react-query'

export const useGetAmountBid = (amount: number) => {
  return useQuery({
    queryKey: ['bid-calculate', { amount }],
    queryFn: async () => await getAmountBid(amount),
    enabled: amount !== 0 && !isNaN(amount)
  })
}
