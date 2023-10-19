import { Grid } from '@mui/material'
import { initProducts } from '../Home/BestSellerSlider'
import ProductItemCard from '../../components/ui/ProductItemCard'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {},
}))
interface Props {
  category: string
}

export default function ProductList({ category }: Props) {
  const { classes } = useStyles()
  return (
    <Grid container columnSpacing={3} rowSpacing={4} className={classes.root}>
      {initProducts.slice(0, 12).map((product) => (
        <Grid item xs={3}>
          <ProductItemCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}
