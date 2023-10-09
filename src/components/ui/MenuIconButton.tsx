import React from 'react'
import { IconButton, IconButtonProps, SvgIconProps } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {},
  icon: {
    fontSize: 32,
  },
}))

interface Props extends Omit<IconButtonProps, 'classes' | 'children'> {
  icon: React.ComponentType<React.PropsWithChildren<SvgIconProps>>
}

export default function MenuIconButton({ icon: Icon, ...props }: Props) {
  const { classes } = useStyles()
  return (
    <IconButton size="large" {...props}>
      <Icon className={classes.icon} />
    </IconButton>
  )
}
