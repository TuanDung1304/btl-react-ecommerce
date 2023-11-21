import { Badge, IconButton, IconButtonProps, SvgIconProps } from '@mui/material'
import React from 'react'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {},
  icon: {
    fontSize: 32,
  },
}))

interface Props extends Omit<IconButtonProps, 'classes' | 'children'> {
  icon: React.ComponentType<React.PropsWithChildren<SvgIconProps>>
  badge?: number
  to?: string
}

export default function MenuIconButton({ icon: Icon, badge, ...props }: Props) {
  const { classes } = useStyles()
  return (
    <IconButton size="large" {...props}>
      {badge ? (
        <Badge badgeContent={badge} color="primary">
          <Icon className={classes.icon} />
        </Badge>
      ) : (
        <Icon className={classes.icon} />
      )}
    </IconButton>
  )
}
