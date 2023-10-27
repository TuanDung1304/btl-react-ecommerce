import { Box } from '@mui/material'
import React from 'react'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {
    width: 433,
    height: 555,

    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
}))

export default function ProductImageSlider() {
  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      <img src="https://product.hstatic.net/200000690725/product/4_c1f6600d1adb40f6b2e2586a1d27529b_master.jpg" />
    </Box>
  )
}
