import { Box } from '@mui/material'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  chart: {
    width: '100%',
    height: '300px',
    marginTop: 10,
  },
}))

const data = [
  {
    name: 'Sun',
    ao: 4000,
    quan: 2400,
    phuKien: 2400,
  },
  {
    name: 'Mon',
    ao: 3000,
    quan: 1398,
    phuKien: 2210,
  },
  {
    name: 'Tue',
    ao: 2000,
    quan: 9800,
    phuKien: 2290,
  },
  {
    name: 'Wed',
    ao: 2780,
    quan: 3908,
    phuKien: 2000,
  },
  {
    name: 'Thu',
    ao: 1890,
    quan: 4800,
    phuKien: 2181,
  },
  {
    name: 'Fri',
    ao: 2390,
    quan: 3800,
    phuKien: 2500,
  },
  {
    name: 'Sat',
    ao: 3490,
    quan: 4300,
    phuKien: 2100,
  },
]

const BigChartBox = () => {
  const { classes } = useStyles()

  return (
    <Box className={classes.root}>
      <h1>Doanh thu</h1>
      <Box className={classes.chart}>
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="ao"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="quan"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="phuKien"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  )
}

export default BigChartBox
