import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import * as React from 'react'
import { makeStyles } from 'tss-react/mui'
import { Size } from '../type'
import { useProductFilter } from '../functions'

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
  const { filter, setProductFilter } = useProductFilter()
  const handleAlignment = (
    _event: React.MouseEvent<HTMLElement>,
    size?: keyof typeof Size,
  ) => {
    setProductFilter({ size: size === filter.size ? undefined : size })
  }

  return (
    <ToggleButtonGroup
      value={filter.size}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      className={classes.root}>
      <ToggleButton value="XS">XS</ToggleButton>
      <ToggleButton value="S">S</ToggleButton>
      <ToggleButton value="M">M</ToggleButton>
      <ToggleButton value="L">L</ToggleButton>
      <ToggleButton value="XL">XL</ToggleButton>
    </ToggleButtonGroup>
  )
}
