import { Box, Grid } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { useColorsFilter } from '../hooks'
import { useProductFilter } from '../functions'

const useStyles = makeStyles()((theme) => ({
  circleWrapper: {
    width: 26,
    height: 26,
    cursor: 'pointer',
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  color: {
    width: 20,
    height: 20,
    borderRadius: '50%',
  },
  colorSelected: {
    border: `2px solid ${theme.palette.primary.main}`,
  },
}))

export default function ColorFilter() {
  const { classes, cx } = useStyles()
  const colors = useColorsFilter()
  const {
    filter: { color: selectedColor },
    setProductFilter,
  } = useProductFilter()

  const handleSelect = (color: string) => {
    setProductFilter({ color })
  }

  return (
    <Grid container rowGap={1}>
      {colors.map((color) => (
        <Grid xs={2}>
          <Box
            className={cx(classes.circleWrapper, {
              [classes.colorSelected]: selectedColor === color,
            })}
            onClick={() => handleSelect(color)}>
            <Box className={classes.color} bgcolor={color} />
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}
