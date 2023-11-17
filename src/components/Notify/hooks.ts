import { useCallback } from 'react'
import { useNotifyContext } from './NotifyContextProvider'
import { ShowNotificationOptions } from './types'
import { isAxiosError } from 'axios'

export const useNotify = () => {
  const notifyContext = useNotifyContext()
  const notify = useCallback(
    (message: string, options?: ShowNotificationOptions) => {
      return notifyContext.show(message, {
        severity: options?.severity ?? 'success',
        autoClose: options?.autoClose,
      })
    },
    [notifyContext],
  )

  const notifyError = useCallback(
    (error: unknown) => {
      if (isAxiosError(error)) {
        notify(error.response?.data.message ?? error.message, {
          severity: 'error',
        })
      }
    },
    [notify],
  )

  return { notify, notifyError }
}
