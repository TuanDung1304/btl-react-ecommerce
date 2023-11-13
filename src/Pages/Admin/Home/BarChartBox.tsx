import { Box, Typography } from '@mui/material'
import { Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
}))

interface Props {
  title: string
  color: string
  dataKey: string
  chartData: object[]
}

export default function BarChartBox(props: Props) {
  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      <Typography className={classes.text}>{props.title}</Typography>
      <Box className="chart">
        <ResponsiveContainer width="99%" height={150}>
          <BarChart data={props.chartData}>
            <Tooltip
              contentStyle={{
                background: '#2a3447',
                borderRadius: '5px',
              }}
              labelStyle={{ display: 'none' }}
              cursor={{ fill: 'none' }}
            />
            <Bar dataKey={props.dataKey} fill={props.color} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  )
}
