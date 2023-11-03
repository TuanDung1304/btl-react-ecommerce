import * as React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { makeStyles } from 'tss-react/mui'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { setFilter } from '../../../store/filterSlice'
import { Size } from '../type'

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    gap: 5,

    '& .MuiToggleButton-root': {
      width: '50px',
      borderLeft: '1px solid rgba(0, 0, 0, 0.12) !important',
    },
    '& .Mui-selected': {
      color: theme.palette.primary.main,
      fontWeight: 700,
    },
  },
}))

export default function SizeFilter() {
  const { classes } = useStyles()
  const filter = useSelector((state: RootState) => state.filter)
  const dispatch = useDispatch<AppDispatch>()

  const handleAlignment = (
    _event: React.MouseEvent<HTMLElement>,
    size?: keyof typeof Size,
  ) => {
    dispatch(setFilter({ size: size === filter.size ? undefined : size }))
  }

  return (
    <ToggleButtonGroup
      value={filter.size}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      className={classes.root}>
      <ToggleButton value="xs">XS</ToggleButton>
      <ToggleButton value="s">S</ToggleButton>
      <ToggleButton value="m">M</ToggleButton>
      <ToggleButton value="l">L</ToggleButton>
      <ToggleButton value="xl">XL</ToggleButton>
    </ToggleButtonGroup>
  )
}
