import { useCallback } from 'react'
import { useNotifyContext } from './NotifyContextProvider'
import { ShowNotificationOptions } from './types'

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

  return { notify }
}
