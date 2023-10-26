import { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'

interface Props {
  to: string
  children?: ReactNode
  underline?: boolean
  color?: string
}

const useStyles = makeStyles<{
  underline: boolean | undefined
  color: string | undefined
}>()((_theme, { underline, color }) => ({
  root: {
    textDecoration: underline ? 'underline' : 'none',
    fontFamily: 'Roboto',
    color: color ?? 'black',
  },
}))

export default function Link({ to, children, underline, color }: Props) {
  const { classes } = useStyles({ underline, color })
  return (
    <RouterLink to={to} className={classes.root}>
      {children}
    </RouterLink>
  )
}
