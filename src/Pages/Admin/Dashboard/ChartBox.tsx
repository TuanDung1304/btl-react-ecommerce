import { Box, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'
import { makeStyles } from 'tss-react/mui'
import { getCurrency } from '../../../utils/functions'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  boxInfo: {
    flex: '3',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  h1: {
    fontSize: 20,
  },
  chartInfo: {
    flex: '2',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  chart: {
    width: '100%',
    height: '100%',
  },
  texts: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'right',
  },
  percentage: {
    fontWeight: 'bold',
    fontSize: '20px',
  },
  duration: {
    fontSize: '14px',
  },
}))

interface Props {
  color: string
  title: string
  dataKey: string
  total: number | string
  percentage: number
  chartData: object[]
  url?: string
  icon: ReactNode
  isCurrency?: boolean
}

export default function ChartBox(props: Props) {
  const { classes } = useStyles()

  return (
    <Box className={classes.root}>
      <Box className={classes.boxInfo}>
        <Box className={classes.title}>
          {props.icon}
          <Typography fontSize={18} fontWeight={600}>
            {props.title}
          </Typography>
        </Box>
        <h1>
          {props.isCurrency ? getCurrency(Number(props.total)) : props.total}
        </h1>
        {props?.url ? (
          <Link to={props.url} style={{ color: props.color }}>
            Xem toàn bộ
          </Link>
        ) : (
          <span></span>
        )}
      </Box>
      <Box className={classes.chartInfo}>
        <Box className={classes.chart}>
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: 'transparent', border: 'none' }}
                labelStyle={{ display: 'none' }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={'value'}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Box className={classes.texts}>
          <span
            className={classes.percentage}
            style={{ color: props.percentage < 0 ? 'tomato' : 'limegreen' }}>
            {props.percentage}%
          </span>
          <span className={classes.duration}>Hôm nay</span>
        </Box>
      </Box>
    </Box>
  )
}
