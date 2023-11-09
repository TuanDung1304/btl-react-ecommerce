import * as React from 'react'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { makeStyles } from 'tss-react/mui'
import Refund from './Refund'
import Security from './Security'
import FAQ from './FAQ'

const useStyles = makeStyles()(() => ({
  tabList: {
    '& .MuiTab-root': {
      color: '#b3b3b3',
      fontSize: 18,
      fontWeight: 600,
    },
    '& .Mui-selected': {
      color: '#333',
    },
  },
}))

interface Props {
  description?: string
}

export default function ProductTabs({ description }: Props) {
  const { classes } = useStyles()
  const [value, setValue] = React.useState('1')

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            className={classes.tabList}
            TabIndicatorProps={{ sx: { background: '#333333' } }}>
            <Tab label="Mo ta san pham" value="1" />
            <Tab label="Chinh sach doi tra" value="2" />
            <Tab label="Chinh sach bao mat" value="3" />
            <Tab label="Cau hoi thuong gap" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">{description}</TabPanel>
        <TabPanel value="2">
          <Refund />
        </TabPanel>
        <TabPanel value="3">
          <Security />
        </TabPanel>
        <TabPanel value="4">
          <FAQ />
        </TabPanel>
      </TabContext>
    </Box>
  )
}
