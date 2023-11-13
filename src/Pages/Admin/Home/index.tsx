import { Box } from '@mui/material'
import { useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Product from '../product/Product'
import { useParams } from 'react-router-dom'
import Dashboard from '../Dashboard'

const useStyles = makeStyles()(() => ({
  root: {
    '*': {
      fontFamily: 'Inter',
    },
    backgroundColor: '#2a3447',
    color: 'white',
    minHeight: '100vh',
  },
  contentContainer: {
    padding: '5px 20px',
    flex: 1,
  },
}))

interface TabPanelProps {
  children?: React.ReactNode
  index: string
  value: string
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function AdminHome() {
  const { classes } = useStyles()
  const params = useParams()
  const [value, setValue] = useState(
    `/admin/${params?.page}` ?? '/admin/dashboard',
  )

  return (
    <Box className={classes.root}>
      <Navbar />
      <Box display={'flex'}>
        <Sidebar value={value} setValue={setValue} />
        <Box className={classes.contentContainer}>
          <TabPanel value={value} index={'/admin/dashboard'}>
            <Dashboard />
          </TabPanel>
          <TabPanel value={value} index={'/admin/products'}>
            <Product />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  )
}
