import { Box } from '@mui/material'
import BarChartBox from '../../../components/barChartBox/BarChartBox'
import BigChartBox from '../../../components/bigChartBox/BigChartBox'
import ChartBox from '../../../components/chartBox/ChartBox'
import PieChartBox from '../../../components/pieCartBox/PieChartBox'
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from '../../../data'
import { makeStyles } from 'tss-react/mui'
import TopBox from '../../../components/topBox/TopBox'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridAutoRows: 'minmax(180px, auto)',
    gridAutoFlow: 'dense',

    '&>div': {
      padding: '20px',
      borderRadius: '10px',
      border: '2px solid #384256',
    },
  },
  box1: {
    gridColumn: 'span 1',
    gridRow: 'span 3',
  },
  box4: {
    gridColumn: 'span 1',
    gridRow: 'span 3',
  },
  box7: {
    gridColumn: 'span 2',
    gridRow: 'span 2',
  },
}))

const Home = () => {
  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.box1}>
        <TopBox />
      </Box>
      <Box>
        <ChartBox {...chartBoxUser} />
      </Box>
      <Box>
        <ChartBox {...chartBoxProduct} />
      </Box>
      <Box className={classes.box4}>
        <PieChartBox />
      </Box>
      <Box>
        <ChartBox {...chartBoxConversion} />
      </Box>
      <Box>
        <ChartBox {...chartBoxRevenue} />
      </Box>
      <Box className={classes.box7}>
        <BigChartBox />
      </Box>
      <Box>
        <BarChartBox {...barChartBoxVisit} />
      </Box>
      <Box>
        <BarChartBox {...barChartBoxRevenue} />
      </Box>
    </Box>
  )
}

export default Home
