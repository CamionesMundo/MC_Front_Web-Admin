import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import axios, { type AxiosRequestConfig } from 'axios'
import { getServerSession } from 'next-auth'

const mcApi = async () => {
  const session = await getServerSession(authOptions)

  const token = session?.user.token

  const mcInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return {
    get: async <T>(url: string, config?: AxiosRequestConfig) =>
      await mcInstance.get<T>(url, config),
    post: async <T>(url: string, body: unknown, config?: AxiosRequestConfig) =>
      await mcInstance.post<T>(url, body, config),
    put: async <T>(url: string, body: unknown, config?: AxiosRequestConfig) =>
      await mcInstance.put<T>(url, body, config),
    delete: async <T>(url: string, config?: AxiosRequestConfig) =>
      await mcInstance.delete<T>(url, config)
  }
}

export default mcApi
