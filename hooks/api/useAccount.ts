import { recoveryPassword, updatePassword } from '@/helpers/api/recovery'
import { useMutation } from '@tanstack/react-query'

export const useRecoveryPassword = () => {
  return useMutation({
    mutationKey: ['recoveryPassword'],
    mutationFn: recoveryPassword
  })
}

export const useUpdatePassword = () => {
  return useMutation({
    mutationKey: ['updatePassword'],
    mutationFn: updatePassword
  })
}
