import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { getSession } from 'next-auth/react'

export const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000
})

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession()
  config.headers.token = session?.user.token
  return config
})

const api = (axiosInstance: AxiosInstance) => {
  return {
    get: async <T>(url: string, config?: AxiosRequestConfig) =>
      await axiosInstance.get<T>(url, config),
    post: async <T>(url: string, body: unknown, config?: AxiosRequestConfig) =>
      await axiosInstance.post<T>(url, body, config),
    put: async <T>(url: string, body: unknown, config?: AxiosRequestConfig) =>
      await axiosInstance.put<T>(url, body, config),
    delete: async <T>(url: string, config?: AxiosRequestConfig) =>
      await axiosInstance.delete<T>(url, config)
  }
}

export default api(axiosInstance)
