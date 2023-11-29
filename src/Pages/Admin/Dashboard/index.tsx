import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import { AdminService } from '../../../api/services/admin'
import { DashboardData } from '../../../api/services/types'
import { useNotify } from '../../../components/Notify/hooks'
import BigChartBox from './BigChartBox'
import ChartBox from './ChartBox'
import TopBox from './TopBox'
import PersonIcon from '@mui/icons-material/Person'
import CategoryIcon from '@mui/icons-material/Category'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridAutoRows: 'minmax(180px, auto)',
    gridAutoFlow: 'dense',

    '&>div': {
      padding: '20px',
      borderRadius: '10px',
      border: '1px solid #384256',
    },
  },
  topBox: {
    gridColumn: 'span 1',
    gridRow: 'span 2',
  },
  bigChartBox: {
    gridColumn: 'span 3',
    gridRow: 'span 2',
  },
}))

export default function Dashboard() {
  const { classes } = useStyles()

  const [data, setData] = useState<DashboardData>()
  const { notifyError } = useNotify()
  console.log(data)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await AdminService.getDashboardData()
        setData(res)
      } catch (err) {
        notifyError(err)
      }
    }
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {data && (
        <Box className={classes.root}>
          <Box className={classes.topBox}>
            <TopBox topUsers={data.topDeals} />
          </Box>
          <Box>
            <ChartBox
              {...data.users}
              color="#8884d8"
              title="Người dùng"
              url="/admin/users"
              icon={<PersonIcon />}
            />
          </Box>
          <Box>
            <ChartBox
              {...data.products}
              color="skyblue"
              icon={<CategoryIcon />}
              title="Sản phẩm"
              url="/admin/products"
            />
          </Box>
          <Box>
            <ChartBox
              {...data.orders}
              color="gold"
              icon={<ShoppingCartIcon />}
              title="Đơn hàng"
              url="/admin/orders"
            />
          </Box>
          <Box>
            <ChartBox
              {...data.profit}
              color="teal"
              icon={<AttachMoneyIcon />}
              title="Doanh thu"
              isCurrency
            />
          </Box>
          <Box className={classes.bigChartBox}>
            <BigChartBox />
          </Box>
        </Box>
      )}
    </>
  )
}
