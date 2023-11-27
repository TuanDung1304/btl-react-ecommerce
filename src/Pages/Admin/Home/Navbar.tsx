import Logout from '@mui/icons-material/Logout'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Settings from '@mui/icons-material/Settings'
import { Box, IconButton } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import React from 'react'
import { makeStyles } from 'tss-react/mui'
import { useCurrentUser, useTokens } from '../../../hooks'
import { AuthService } from '../../../api/services/auth'
import { useNotify } from '../../../components/Notify/hooks'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles()(() => ({
  root: {
    width: '100%',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    alignItems: 'center',
    fontWeight: 'bold',
    marginLeft: 30,
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  notification: {
    position: 'relative',

    span: {
      backgroundColor: 'red',
      color: 'white',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      position: 'absolute',
      top: '-10px',
      right: '-10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
    },
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
}))

export default function Navbar() {
  const { classes } = useStyles()
  const { user, removeUser } = useCurrentUser()
  const { notify, notifyError } = useNotify()
  const { removeTokens } = useTokens()
  const navigate = useNavigate()

  const logout = async () => {
    setAnchorEl(null)
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
      <Box className={classes.logo}>
        <span>ADMIN</span>
      </Box>
      <Box className={classes.user}>
        <NotificationsIcon />
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}>
          <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
        </IconButton>
        <span>{user.firstName}</span>
        <Settings />
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}
