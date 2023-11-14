import { Box } from '@mui/material'
import { useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useLocation } from 'react-router-dom'
import Dashboard from '../Dashboard'
import { TabContext, TabPanel } from '@mui/lab'
import { ROUTES } from '../../../components/Routes/Router'
import User from '../user/User'
import Users from '../Users'
import Products from '../Products'

const useStyles = makeStyles()(() => ({
  root: {
    width: '100%',
    '*': {
      fontFamily: 'Inter',
    },
    backgroundColor: '#2a3447',
    color: 'white',
    minHeight: '100vh',
  },
  contentContainer: {
    flex: 1,
    '& .MuiTabPanel-root': {
      paddingTop: 10,
    },
  },
}))

export default function AdminHome() {
  const { classes } = useStyles()
  const location = useLocation()
  const [value, setValue] = useState(
    location.pathname ?? ROUTES.admin.dashboard,
  )

  return (
    <Box className={classes.root}>
      <Navbar />
      <Box display={'flex'}>
        <TabContext value={value}>
          <Sidebar value={value} setValue={setValue} />
          <Box className={classes.contentContainer}>
            <TabPanel value={ROUTES.admin.dashboard}>
              <Dashboard />
            </TabPanel>
            <TabPanel value={ROUTES.admin.users}>
              <Users />
            </TabPanel>
            <TabPanel value={ROUTES.admin.products}>
              <Products />
            </TabPanel>
            <TabPanel value={ROUTES.admin.profile}>
              <User />
            </TabPanel>
            <TabPanel value={ROUTES.admin.orders}>Orders</TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Box>
  )
}
