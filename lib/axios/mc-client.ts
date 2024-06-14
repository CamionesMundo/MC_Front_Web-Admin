import axios, { type AxiosRequestConfig } from 'axios'
import { getServerSession } from 'next-auth'
import authOptions from '../auth/options'

/**
 * Function to create an instance of the API client for interacting with the backend server.
 * @returns An object containing methods for making HTTP requests (GET, POST, PUT, DELETE) to the backend server.
 */
const mcApi = async () => {
  // Retrieve session information from the server
  const session = await getServerSession(authOptions)

  // Extract the user's token from the session
  const token = session?.user.token

  // Create an instance of Axios with the appropriate configuration
  const mcInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  // Return an object containing methods for making HTTP requests
  return {
    /**
     * Sends a GET request to the specified URL.
     * @param url The URL to send the request to.
     * @param config Optional configuration for the request.
     * @returns A promise resolving to the response data of type T.
     */

    get: async <T>(url: string, config?: AxiosRequestConfig) =>
      await mcInstance.get<T>(url, config),

    /**
     * Sends a POST request to the specified URL with the given body.
     * @param url The URL to send the request to.
     * @param body The data to send in the request body.
     * @param config Optional configuration for the request.
     * @returns A promise resolving to the response data of type T.
     */
    post: async <T>(url: string, body: unknown, config?: AxiosRequestConfig) =>
      await mcInstance.post<T>(url, body, config),

    /**
     * Sends a PUT request to the specified URL with the given body.
     * @param url The URL to send the request to.
     * @param body The data to send in the request body.
     * @param config Optional configuration for the request.
     * @returns A promise resolving to the response data of type T.
     */
    put: async <T>(url: string, body: unknown, config?: AxiosRequestConfig) =>
      await mcInstance.put<T>(url, body, config),

    /**
     * Sends a PATCH request to the specified URL with the given body.
     * @param url The URL to send the request to.
     * @param body The data to send in the request body.
     * @param config Optional configuration for the request.
     * @returns A promise resolving to the response data of type T.
     */
    patch: async <T>(url: string, body: unknown, config?: AxiosRequestConfig) =>
      await mcInstance.patch<T>(url, body, config),
    /**
     * Sends a DELETE request to the specified URL.
     * @param url The URL to send the request to.
     * @param config Optional configuration for the request.
     * @returns A promise resolving to the response data of type T.
     */
    delete: async <T>(
      url: string,
      body?: unknown,
      config?: AxiosRequestConfig
    ) => await mcInstance.delete<T>(url, { ...config, data: body })
  }
}

export default mcApi
