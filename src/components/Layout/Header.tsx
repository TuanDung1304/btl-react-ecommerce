import { TabContext, TabList } from '@mui/lab'
import { Box, Tab, colors } from '@mui/material'
import React, { useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import MenuIconButton from '../ui/MenuIconButton'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

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

export default function Header() {
  const { classes } = useStyles()
  const [value, setValue] = useState('')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  return (
    <Box className={classes.root}>
      <img src="src/assets/logo.png" className={classes.image} />
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="WOMEN" value="women" className={classes.tabList} />
            <Tab label="MEN" value="men" className={classes.tabList} />
            <Tab
              label="SPORTSWEAR"
              value="sportswear"
              className={classes.tabList}
            />
          </TabList>
        </Box>
      </TabContext>
      <Box>
        <MenuIconButton icon={SearchIcon} />
        <MenuIconButton icon={PersonIcon} />
        <MenuIconButton icon={ShoppingCartIcon} />
      </Box>
    </Box>
  )
}
