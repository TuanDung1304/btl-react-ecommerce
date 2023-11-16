import { Button, colors } from '@mui/material'
import { withStyles } from 'tss-react/mui'

export const ButtonDanger = withStyles(Button, (theme) => ({
  root: {
    color: '#fff',
    fontWeight: 600,
    backgroundColor: theme.palette.error.main,

    '&:hover': {
      backgroundColor: colors.red[500],
      color: '#fff',
    },
  },
}))
