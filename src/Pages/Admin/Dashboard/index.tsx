import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import {
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from '../../../data'
import TopBox from './TopBox'
import ChartBox from './ChartBox'
import BigChartBox from './BigChartBox'

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
  return (
    <Box className={classes.root}>
      <Box className={classes.topBox}>
        <TopBox />
      </Box>
      <Box>
        <ChartBox {...chartBoxUser} />
      </Box>
      <Box>
        <ChartBox {...chartBoxProduct} />
      </Box>
      <Box>
        <ChartBox {...chartBoxConversion} />
      </Box>
      <Box>
        <ChartBox {...chartBoxRevenue} />
      </Box>
      <Box className={classes.bigChartBox}>
        <BigChartBox />
      </Box>
    </Box>
  )
}
