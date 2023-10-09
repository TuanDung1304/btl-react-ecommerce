import { Box, Grid, colors } from '@mui/material'
import React from 'react'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 74,
    borderBottom: `1px solid ${colors.grey[300]}`,
  },
  image: {
    height: 50,
    objectFit: 'cover',
  },
  tabList: {
    fontSize: 20,
    fontWeight: 500,
  },
}))

export default function Footer() {
  return (
    <Box>
      <Grid container sx={{ borderTop: 1, borderColor: 'darkolivegreen' }}>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Box>
  )
}
