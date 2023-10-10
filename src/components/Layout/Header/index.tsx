import PersonIcon from '@mui/icons-material/Person'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { TabContext, TabList } from '@mui/lab'
import { Box, Menu, MenuItem, Tab, colors } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import MenuIconButton from '../../ui/MenuIconButton'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 74,
    borderBottom: `1px solid ${colors.grey[300]}`,
    width: '100%',
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  image: {
    height: 50,
    objectFit: 'cover',
  },
  tabList: {
    fontSize: 20,
    fontWeight: 500,
  },
  menuLink: {
    color: 'black',
    textDecoration: 'none',
    width: '100%',
    height: '100%',
  },
}))

export default function Header() {
  const { classes } = useStyles()
  const [value, setValue] = useState('')

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  return (
    <Box className={classes.root}>
      <Link to={'/'}>
        <img src="src/assets/logo.png" className={classes.image} />
      </Link>
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
        <MenuIconButton icon={PersonIcon} onClick={handleClick} />
        <MenuIconButton icon={ShoppingCartIcon} />
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{ width: 200 }}
        slotProps={{ paper: { sx: { width: '150px' } } }}>
        <MenuItem onClick={handleClose}>
          <Link to="/login" className={classes.menuLink}>
            Login
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/register" className={classes.menuLink}>
            Sign up
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  )
}
