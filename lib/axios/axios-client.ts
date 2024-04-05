import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

export const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000
})

axiosInstance.interceptors.request.use((config) => {
  return config
})

/**
 * Function to create an API client using a given Axios instance.
 * @param axiosInstance Axios instance to be used for making HTTP requests.
 * @returns An object containing methods for making HTTP requests (GET, POST, PUT, DELETE) using the provided Axios instance.
 */

const api = (axiosInstance: AxiosInstance) => {
  return {
    /**
     * Sends a GET request to the specified URL.
     * @param url The URL to send the request to.
     * @param config Optional configuration for the request.
     * @returns A promise resolving to the response data of type T.
     */
    get: async <T>(url: string, config?: AxiosRequestConfig) =>
      await axiosInstance.get<T>(url, config),

    /**
     * Sends a POST request to the specified URL with the given body.
     * @param url The URL to send the request to.
     * @param body The data to send in the request body.
     * @param config Optional configuration for the request.
     * @returns A promise resolving to the response data of type T.
     */
    post: async <T>(url: string, body: unknown, config?: AxiosRequestConfig) =>
      await axiosInstance.post<T>(url, body, config),

    /**
     * Sends a PUT request to the specified URL with the given body.
     * @param url The URL to send the request to.
     * @param body The data to send in the request body.
     * @param config Optional configuration for the request.
     * @returns A promise resolving to the response data of type T.
     */
    put: async <T>(url: string, body: unknown, config?: AxiosRequestConfig) =>
      await axiosInstance.put<T>(url, body, config),

    /**
     * Sends a DELETE request to the specified URL.
     * @param url The URL to send the request to.
     * @param config Optional configuration for the request.
     * @returns A promise resolving to the response data of type T.
     */
    delete: async <T>(url: string, config?: AxiosRequestConfig) =>
      await axiosInstance.delete<T>(url, config)
  }
}

export default api(axiosInstance)
