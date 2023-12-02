import { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'

interface Props {
  to: string
  children?: ReactNode
  underline?: boolean
  underlineOnHover?: boolean
  color?: string
  className?: string
}

const useStyles = makeStyles<{
  underline: boolean | undefined
  color: string | undefined
  underlineOnHover: boolean | undefined
}>()((_theme, { underline, color, underlineOnHover }) => ({
  root: {
    textDecoration: underline ? 'underline' : 'none',
    fontFamily: 'inherit',
    color: color ?? 'black',
    '&:hover': {
      textDecoration: underlineOnHover ? 'underline' : 'none',
    },
  },
}))

export default function Link({
  to,
  children,
  underline,
  color,
  underlineOnHover,
  className,
}: Props) {
  const { classes, cx } = useStyles({ underline, color, underlineOnHover })
  return (
    <RouterLink to={to} className={cx(classes.root, className)}>
      {children}
    </RouterLink>
  )
}
