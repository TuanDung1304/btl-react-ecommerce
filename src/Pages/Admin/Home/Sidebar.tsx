import { Box, Tab, Tabs } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import CategoryIcon from '@mui/icons-material/Category'
import GroupIcon from '@mui/icons-material/Group'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import HomeIcon from '@mui/icons-material/Home'
import DiscountIcon from '@mui/icons-material/Discount'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { ROUTES } from '../../../components/Routes/Router'

const useStyles = makeStyles()(() => ({
  root: {
    minWidth: '230px',
    maxWidth: '230px',
    padding: '5px 0px 5px 20px',
  },
  tabs: {
    width: '100%',
    borderRight: '0px',
    '& .MuiTab-root': {
      color: 'white',
      minHeight: '55px',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: 10,
      fontSize: 16,
      letterSpacing: 0.5,
      '& svg': {
        margin: 0,
      },
    },
    '& .MuiTabs-indicator': {
      backgroundColor: 'white',
    },
  },
}))

interface Props {
  value: string
  setValue: (value: string) => void
}

export default function Sidebar({ setValue, value }: Props) {
  const { classes } = useStyles()

  const tabs = useMemo(() => {
    const tabs = [
      { icon: <HomeIcon />, label: 'Dashboard', url: ROUTES.admin.dashboard },
      { icon: <GroupIcon />, label: 'Người dùng', url: ROUTES.admin.users },
      { icon: <CategoryIcon />, label: 'Sản phẩm', url: ROUTES.admin.products },
      {
        icon: <ShoppingCartCheckoutIcon />,
        label: 'Đơn hàng',
        url: ROUTES.admin.orders,
      },
      {
        icon: <DiscountIcon />,
        label: 'Mã giảm giá',
        url: ROUTES.admin.vouchers,
      },
    ]
    return tabs
  }, [])

  return (
    <Box className={classes.root}>
      <Tabs
        className={classes.tabs}
        orientation="vertical"
        value={value}
        onChange={(_e, value) => setValue(value)}
        sx={{ borderRight: 1, borderColor: 'divider' }}>
        {tabs.map((tab) => (
          <Tab {...tab} value={tab.url} component={Link} to={tab.url} />
        ))}
      </Tabs>
    </Box>
  )
}
