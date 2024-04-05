import { toast } from 'sonner'

type ToastType = 'success' | 'warning' | 'error' | 'info'

/**
 * Displays a toast message with the specified message and type.
 * @param message The message content to display in the toast.
 * @param type The type of toast message ('success', 'warning', 'error', 'info').
 */
const showToast = (message: string, type: ToastType) => {
  const baseOptions = {
    duration: 3000,
    closeButton: true
  }

  let styleOptions
  switch (type) {
    case 'success':
      styleOptions = { className: '!bg-green-200' }
      break
    case 'error':
      styleOptions = { className: '!bg-red-200' }
      break
    case 'warning':
      styleOptions = { className: '!bg-warning-200' }
      break
    case 'info':
      styleOptions = { className: '!bg-blue-200' }
      break
    default:
      styleOptions = {}
  }

  const options = { ...baseOptions, ...styleOptions }

  if (type === 'success') {
    toast.success(message, options)
  } else if (type === 'error') {
    toast.error(message, options)
  } else if (type === 'warning') {
    toast.warning(message, options)
  } else if (type === 'info') {
    toast.info(message, options)
  }
}

export { showToast }
