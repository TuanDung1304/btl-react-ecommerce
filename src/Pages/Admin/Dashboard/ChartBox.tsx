import { Link } from 'react-router-dom'
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'
import { makeStyles } from 'tss-react/mui'

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
  icon: string
  title: string
  dataKey: string
  total: number | string
  percentage: number
  chartData: object[]
}

export default function ChartBox(props: Props) {
  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.boxInfo}>
        <div className={classes.title}>
          <img src={props.icon} alt="" />
          <span>{props.title}</span>
        </div>
        <h1>{props.total}</h1>
        <Link to="/" style={{ color: props.color }}>
          View all
        </Link>
      </div>
      <div className={classes.chartInfo}>
        <div className={classes.chart}>
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: 'transparent', border: 'none' }}
                labelStyle={{ display: 'none' }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={classes.texts}>
          <span
            className={classes.percentage}
            style={{ color: props.percentage < 0 ? 'tomato' : 'limegreen' }}>
            {props.percentage}%
          </span>
          <span className={classes.duration}>this month</span>
        </div>
      </div>
    </div>
  )
}
