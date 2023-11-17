import PersonIcon from '@mui/icons-material/Person'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { TabContext, TabList } from '@mui/lab'
import { Box, Menu, MenuItem, Tab, Typography, colors } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import MenuIconButton from '../../ui/MenuIconButton'
import CategoryHeader from './CategoryHeader'
import { CategoryType } from '../../Categories/categories'
import { useCurrentUser, useTokens } from '../../../hooks'
import { AuthService } from '../../../api/services/auth'
import { useNotify } from '../../Notify/hooks'
import { isAxiosError } from 'axios'

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
  const { notify, notifyError } = useNotify()
  const navigate = useNavigate()
  const { user, removeUser } = useCurrentUser()
  const { removeTokens } = useTokens()

  const logout = async () => {
    setAnchorUserMenu(null)
    try {
      const res = await AuthService.logout()
      notify(res.message)
    } catch (e) {
      notifyError(e)
    } finally {
      removeTokens()
      removeUser()
      navigate('/')
    }
  }

  const [anchorUserMenu, setAnchorUserMenu] = useState<null | HTMLElement>(null)
  const [anchorTab, setAnchorTab] = useState<HTMLDivElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUserMenu(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorUserMenu(null)
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
        <TabList
          onMouseEnter={(e) => setAnchorTab(e.currentTarget)}
          onMouseLeave={() => {
            setValue(''), setAnchorTab(null)
          }}>
          <Tab
            label={CategoryType.Ao}
            value="ao"
            className={classes.tabList}
            onMouseEnter={() => setValue('ao')}
            onClick={() => navigate('/collections/ao-nam')}
          />
          <Tab
            label={CategoryType.Quan}
            value="quan"
            className={classes.tabList}
            onMouseEnter={() => setValue('quan')}
            onClick={() => navigate('/collections/quan-nam')}
          />
          <Tab
            label={CategoryType.PhuKien}
            value="phu-kien"
            className={classes.tabList}
            onMouseEnter={() => setValue('phu-kien')}
            onClick={() => navigate('/collections/phu-kien')}
          />
        </TabList>
      </TabContext>
      <CategoryHeader
        anchorEl={anchorTab}
        handleClose={() => setAnchorTab(null)}
        currentTab={value}
      />
      <Box>
        <MenuIconButton icon={SearchIcon} />
        <MenuIconButton icon={PersonIcon} onClick={handleClick} />
        <MenuIconButton icon={ShoppingCartIcon} />
      </Box>
      <Menu
        anchorEl={anchorUserMenu}
        id="account-menu"
        open={Boolean(anchorUserMenu)}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{ width: 200 }}
        slotProps={{ paper: { sx: { width: '150px' } } }}>
        {user.email ? (
          <>
            <MenuItem onClick={handleClose} className={classes.menuItem}>
              <Link to="/profile" className={classes.menuLink}>
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} className={classes.menuItem}>
              <Link to="/my-order" className={classes.menuLink}>
                My Orders
              </Link>
            </MenuItem>
            <MenuItem onClick={logout} className={classes.menuItem}>
              <Typography className={classes.menuLink}>Logout</Typography>
            </MenuItem>
          </>
        ) : (
          <>
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
          </>
        )}
      </Menu>
    </Box>
  )
}
