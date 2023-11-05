import { AlertColor } from '@mui/material'

export interface ShowNotificationOptions {
  /** The severity of the toast. This defines the color and icon used. */
  severity?: AlertColor
  /** Delay in ms to close the toast. If set to null, the notification needs to be closed manually */
  autoClose?: number | null
}
