import { Grid } from '@mui/material'
import { initProducts } from '../Home/BestSellerSlider'
import ProductItem from '../../components/ui/ProductItem'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {},
}))

export default function ProductList() {
  const { classes } = useStyles()
  return (
    <Grid container columnSpacing={3} rowSpacing={4} className={classes.root}>
      {initProducts.slice(0, 12).map((product) => (
        <Grid item xs={3}>
          <ProductItem product={product} />
        </Grid>
      ))}
    </Grid>
  )
}
