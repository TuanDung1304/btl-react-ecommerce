import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { Typography, colors } from '@mui/material'

export default function PriceFilter() {
  const [value, setValue] = React.useState<number[]>([0, 5000000])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  return (
    <Box>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => value.toLocaleString() + '₫'}
        color={'primary'}
        min={0}
        max={5000000}
        step={100000}
      />
      <Typography>Min price: {value[0].toLocaleString()}₫</Typography>
      <Typography>Max price: {value[1].toLocaleString()}₫</Typography>
    </Box>
  )
}
