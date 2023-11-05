import { ReactNode, createContext, useContext, useState } from 'react'
import SimpleSnackbar from '.'
import { ShowNotificationOptions } from './types'

interface NotifyContext {
  show: (message: string, options?: ShowNotificationOptions) => void
  dismiss: () => void
}

const NotifyContext = createContext<NotifyContext | undefined>(undefined)

export function useNotifyContext(): NotifyContext {
  const context = useContext(NotifyContext)
  if (context === undefined) {
    throw new Error('The component must be a child of NotifyContextProvider')
  }
  return context
}

export const NotifyContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const handleClose = () => {
    setToast(null)
  }
  const [toast, setToast] = useState<JSX.Element | null>(null)
  const context: NotifyContext = {
    show(message, options) {
      setToast(
        <SimpleSnackbar
          message={message}
          severity={options?.severity ?? 'success'}
          autoClose={options?.autoClose}
          handleClose={handleClose}
        />,
      )
    },
    dismiss() {
      setToast(null)
    },
  }
  return (
    <NotifyContext.Provider value={context}>
      {toast}
      {children}
    </NotifyContext.Provider>
  )
}
