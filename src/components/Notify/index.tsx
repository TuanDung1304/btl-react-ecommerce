import { Alert, AlertColor } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'

interface Props {
  handleClose: () => void
  message: string
  severity: AlertColor
  autoClose?: number | null
}

export default function SimpleSnackbar({
  message,
  handleClose,
  severity,
  autoClose = 3000,
}: Props) {
  return (
    <Snackbar open autoHideDuration={autoClose} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
