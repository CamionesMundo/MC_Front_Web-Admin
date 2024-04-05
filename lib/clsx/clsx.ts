import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges multiple class names and returns a single string representing the combined class names.
 * @param inputs The class values to merge.
 * @returns A string representing the combined class names.
 */
export function cn (...inputs: ClassValue[]) {
  /**
   * Merges multiple class names using the clsx library.
   */
  return twMerge(clsx(inputs))
}
