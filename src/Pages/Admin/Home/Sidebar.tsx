import { Box, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import HomeIcon from '@mui/icons-material/Home'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CategoryIcon from '@mui/icons-material/Category'
import GroupIcon from '@mui/icons-material/Group'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import { useNavigate, useParams } from 'react-router-dom'

const useStyles = makeStyles()(() => ({
  root: {
    width: '230px',
    padding: '5px 0px 5px 20px',
  },
  tabs: {
    width: '100%',
    borderRight: '0px',
    '& .MuiTab-root': {
      color: 'white',
      minHeight: '55px',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: 10,
      fontSize: 16,
      letterSpacing: 0.5,
      '& svg': {
        margin: 0,
      },
    },
    '& .MuiTabs-indicator': {
      backgroundColor: 'white',
    },
  },
}))

interface Props {
  value: string
  setValue: (value: string) => void
}

export default function Sidebar({ setValue, value }: Props) {
  const { classes } = useStyles()
  const navigate = useNavigate()

  const tabs = [
    { icon: <HomeIcon />, label: 'Home Page', url: '/admin/dashboard' },
    { icon: <AccountCircleIcon />, label: 'Profile', url: '/admin/profile' },
    { icon: <GroupIcon />, label: 'Users', url: '/admin/users' },
    { icon: <CategoryIcon />, label: 'Products', url: '/admin/products' },
    {
      icon: <ShoppingCartCheckoutIcon />,
      label: 'Orders',
      url: '/admin/orders',
    },
  ]

  return (
    <Box className={classes.root}>
      <Tabs
        className={classes.tabs}
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={(_e, value) => setValue(value)}
        sx={{ borderRight: 1, borderColor: 'divider' }}>
        {tabs.map((tab) => (
          <Tab {...tab} onClick={() => navigate(tab.url)} value={tab.url} />
        ))}
      </Tabs>
    </Box>
  )
}
