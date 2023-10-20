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
  menuItem: {
    padding: 0,
  },
  menuLink: {
    color: 'black',
    textDecoration: 'none',
    width: '100%',
    height: '100%',
    padding: '6px 16px',
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

  return (
    <Box className={classes.root}>
      <Link to={'/'}>
        <img
          src="https://spree-shopping-mall-demo.herokuapp.com/assets/logo/fashion_store_logo-7e5bc0ced748ad79fd7dc5269fa106c5d91d0724daac368e7e197f14f42e5744.png"
          className={classes.image}
        />
      </Link>
      <TabContext value={value}>
        <Box>
          <TabList
            onMouseLeave={() => setValue('')}
            aria-label="lab API tabs example">
            <Tab
              label="Ao"
              value="ao"
              className={classes.tabList}
              onMouseEnter={() => setValue('ao')}
            />
            <Tab
              label="Quan"
              value="quan"
              className={classes.tabList}
              onMouseEnter={() => setValue('quan')}
            />
            <Tab
              label="Phu Kien"
              value="phu-kien"
              className={classes.tabList}
              onMouseEnter={() => setValue('phu-kien')}
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
        <MenuItem onClick={handleClose} className={classes.menuItem}>
          <Link to="/login" className={classes.menuLink}>
            Login
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose} className={classes.menuItem}>
          <Link to="/register" className={classes.menuLink}>
            Sign up
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  )
}
