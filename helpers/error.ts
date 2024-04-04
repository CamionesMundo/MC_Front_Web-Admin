import { AxiosError } from 'axios'

export function handleServerError (error: unknown) {
  if (error instanceof AxiosError) {
    return error.message.split('\n')
  }

  if (error instanceof Error) {
    return error.message
  }

  return String(error).split('\n')
}
