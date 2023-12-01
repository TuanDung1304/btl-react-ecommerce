import PersonIcon from '@mui/icons-material/Person'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { TabContext, TabList } from '@mui/lab'
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Tab,
  Typography,
  colors,
} from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import { AuthService } from '../../../api/services/auth'
import { useCurrentUser, useTokens } from '../../../hooks'
import { CategoryType } from '../../../consts'
import { useNotify } from '../../Notify/hooks'
import MenuIconButton from '../../ui/MenuIconButton'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Notification from './Notification'
import LogoutIcon from '@mui/icons-material/Logout'

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
    display: 'flex',
    alignItems: 'center',
    color: 'black',
    fontWeight: 500,
    textDecoration: 'none',
    width: '100%',
    height: '100%',
    padding: '6px 16px',
  },
}))

export default function Header() {
  const { classes } = useStyles()
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
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  // eslint-disable-next-line no-extra-boolean-cast
  const id = Boolean(anchorEl) ? 'simple-popover' : undefined

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
      <TabContext value="">
        <TabList>
          <Tab
            label={CategoryType.Ao}
            value="ao"
            className={classes.tabList}
            onClick={() => navigate('/collections/ao-nam')}
          />
          <Tab
            label={CategoryType.Quan}
            value="quan"
            className={classes.tabList}
            onClick={() => navigate('/collections/quan-nam')}
          />
          <Tab
            label={CategoryType.PhuKien}
            value="phu-kien"
            className={classes.tabList}
            onClick={() => navigate('/collections/phu-kien')}
          />
        </TabList>
      </TabContext>
      <Box display="flex" alignItems="center">
        <MenuIconButton icon={SearchIcon} />
        {user.email ? (
          <IconButton onClick={handleClick}>
            <Avatar src={user.avatar}></Avatar>
          </IconButton>
        ) : (
          <MenuIconButton icon={PersonIcon} onClick={handleClick} />
        )}
        {user.email && (
          <MenuIconButton
            icon={NotificationsIcon}
            badge={user.notifyBadge}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          />
        )}
        <MenuIconButton
          component={Link}
          icon={ShoppingCartIcon}
          badge={user.cartQuantity}
          to={'/cart'}
        />
      </Box>
      <Menu
        anchorEl={anchorUserMenu}
        id="account-menu"
        open={Boolean(anchorUserMenu)}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        {user.email ? (
          <>
            <MenuItem onClick={handleClose} className={classes.menuItem}>
              <Link to="/account/profile" className={classes.menuLink}>
                Hồ sơ
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} className={classes.menuItem}>
              <Link to="/account/my-orders" className={classes.menuLink}>
                Đơn hàng của tôi
              </Link>
            </MenuItem>
            <MenuItem onClick={logout} className={classes.menuItem}>
              <Typography className={classes.menuLink}>
                Đăng xuất
                <LogoutIcon sx={{ color: colors.grey[500], marginLeft: 1 }} />
              </Typography>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleClose} className={classes.menuItem}>
              <Link to="/login" className={classes.menuLink}>
                Đăng nhập
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose} className={classes.menuItem}>
              <Link to="/register" className={classes.menuLink}>
                Đăng ký
              </Link>
            </MenuItem>
          </>
        )}
      </Menu>
      <Popover
        id={id}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Notification onClose={() => setAnchorEl(null)} />
      </Popover>
    </Box>
  )
}
