import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import { AdminService } from '../../../api/services/admin'
import { DashboardData } from '../../../api/services/types'
import { useNotify } from '../../../components/Notify/hooks'
import BigChartBox from './BigChartBox'
import ChartBox from './ChartBox'
import TopBox from './TopBox'

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
    gridRow: 'span 4',
  },
  box4: {
    gridColumn: 'span 1',
    gridRow: 'span 3',
  },
  bigChartBox: {
    gridColumn: 'span 2',
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
  }, [])

  return (
    <>
      {data && (
        <Box className={classes.root}>
          <Box className={classes.topBox}>
            <TopBox />
          </Box>
          <Box>
            <ChartBox
              {...data.users}
              color="#8884d8"
              icon=""
              title="Total Users"
            />
          </Box>
          <Box>
            <ChartBox
              {...data.products}
              color="skyblue"
              icon=""
              title="Total Products"
            />
          </Box>
          <Box>
            <ChartBox
              {...data.orders}
              color="gold"
              icon=""
              title="Total Orders"
            />
          </Box>
          <Box>
            <ChartBox
              {...data.profit}
              color="teal"
              icon=""
              title="Total Profit"
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
