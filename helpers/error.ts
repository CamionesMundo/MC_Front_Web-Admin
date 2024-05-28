import { showToast } from '@/hooks/useToast'
import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

/**
 * Handles server error responses, extracting error messages.
 * @param error The error object to handle.
 * @returns An array of error messages or a single error message.
 */
export function handleServerError (error: unknown) {
  if (error instanceof AxiosError) {
    console.log(error)
    if (error.response !== undefined) {
      return NextResponse.json({
        statusCode: error.response.status,
        message: null,
        data: null,
        error: error.message.split('\n')
      })
    } else {
      return NextResponse.json({
        statusCode: 500,
        message: null,
        data: null,
        error: error.message.split('\n')
      })
    }
  }

  if (error instanceof Error) {
    return NextResponse.json({
      statusCode: 500,
      message: null,
      data: null,
      error: error.message
    })
  }
  return NextResponse.json({
    statusCode: 500,
    message: null,
    data: null,
    error: String(error).split('\n')
  })
}

/**
 * Represents a collection of error messages for form validation.
 */
export type FormErrorMessages = Record<string, string>

/**
 * Handles validation errors generated by Zod schema validation.
 * @param err The error object to handle.
 * @returns A collection of form error messages or undefined.
 */
export const handleValidationFormErrors = (
  err: unknown
): FormErrorMessages | undefined => {
  if (err instanceof ZodError) {
    const error: FormErrorMessages = {}
    err.errors.forEach((issue) => {
      if (typeof issue.path[0] === 'string') {
        error[issue.path[0]] = issue.message
      }
    })
    return error
  } else {
    console.log('ERROR=>', err)
    return undefined
  }
}

export const handleValidationErrors = (
  err: unknown
): string | undefined => {
  if (err instanceof ZodError) {
    const errorMessage = err.errors[0]?.message
    return errorMessage
  } else {
    console.log('ERROR=>', err)
    return undefined
  }
}

/**
 * Handles client errors by displaying appropriate error messages based on the HTTP status code.
 *
 * @param statusCode - The HTTP status code returned from a failed API request.
 */
export const handleClientError = (statusCode: number) => {
  if (statusCode === 401) {
    showToast('Usuario no autorizado | Token expirado', 'error')
  }
  if (statusCode === 404) {
    showToast('Recurso no encontrado', 'error')
  }
  if (statusCode === 500) {
    showToast('Error en el servidor', 'error')
  }
}
