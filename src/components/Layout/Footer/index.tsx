import { Box, Grid, colors } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { CategoriesOwn } from '../../Categories/categories'
import CatagoryLinks from './CatagoryLinks'

const useStyles = makeStyles()(() => ({
  root: {
    width: '75%',
    borderTop: `1px solid ${colors.grey[300]}`,
  },
  gridContainer: {
    padding: '0 15px',
  },
  link: {
    fontSize: 16,
    fontWeight: 400,
    marginTop: 10,
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    fontFamily: 'Roboto',
  },
}))

export default function Footer() {
  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      <Grid container className={classes.gridContainer}>
        <CatagoryLinks type={CategoriesOwn.WOMEN} />
        <CatagoryLinks type={CategoriesOwn.MEN} />
        <CatagoryLinks type={CategoriesOwn.SPORTSWEAR} />
        <CatagoryLinks type={'myAccount'} />
      </Grid>
    </Box>
  )
}
