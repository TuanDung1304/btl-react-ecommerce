import React from 'react'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '330px',
  },
}))

export default function ProductFilter() {
  const { classes } = useStyles()

  return <div className={classes.root}> ProductFilter</div>
}
