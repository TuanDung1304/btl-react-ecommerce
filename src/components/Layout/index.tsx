import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

interface Props {
  children: React.ReactNode
}

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

export default function MainLayout({ children }: Props) {
  const { classes } = useStyles()

  return (
    <Box className={classes.root}>
      <Header />
      {children}
      <Footer />
    </Box>
  )
}
