import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import * as React from 'react'
import { useProductFilter } from '../functions'

export default function PriceFilter() {
  const [value, setValue] = React.useState<number[]>([0, 5000000])
  const { setProductFilter } = useProductFilter()

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  const handleChangeCommited = () => {
    setProductFilter({ min: value[0], max: value[1], page: 1 })
  }

  return (
    <Box>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommited}
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
