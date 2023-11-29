import { Box, Tabs } from '@mui/material'
import Tab from '@mui/material/Tab'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import { ROUTES } from '../../components/Routes/Router'

const useStyles = makeStyles()(() => ({
  root: {
    width: '100%',
    display: 'flex',
    padding: 40,
  },
  tabsContainer: {
    width: 200,
    height: '100%',
    background: '#f9f9f9',
    color: '#757575',
    position: 'sticky',

    '& .MuiTab-root': {
      fontWeight: 600,
    },
    '& .Mui-selected': {
      color: 'black !important',
    },
  },
}))

export default function Account() {
  const { classes } = useStyles()
  const location = useLocation()

  return (
    <Box className={classes.root}>
      <Box className={classes.tabsContainer}>
        <Tabs
          value={location.pathname}
          orientation="vertical"
          TabIndicatorProps={{ sx: { width: '3px', background: 'black' } }}>
          <Tab
            to="/account/profile"
            label="Tài khoản"
            value={'/account/profile'}
            component={Link}
          />
          <Tab
            component={Link}
            to={ROUTES.client.account.orders}
            label="Đơn hàng"
            value={ROUTES.client.account.orders}
          />
          <Tab
            component={Link}
            to={ROUTES.client.account.changePassword}
            label="Đổi mật khẩu"
            value={ROUTES.client.account.changePassword}
          />
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  )
}
