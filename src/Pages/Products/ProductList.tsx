import { Grid } from '@mui/material'
import { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import { ProductService } from '../../api/services/products'
import { useNotify } from '../../components/Notify/hooks'
import ProductItem from '../../components/ui/ProductItem'
import { Product } from './type'

const useStyles = makeStyles()(() => ({
  root: {},
}))

export default function ProductList() {
  const { classes } = useStyles()
  const params = useParams()
  const { notify } = useNotify()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ProductService.getProducts(params.collection ?? '')
        setProducts(res)
      } catch (err) {
        if (isAxiosError(err)) {
          notify(err.response?.data.message)
        }
      }
    }
    fetchData()
  }, [params])

  return (
    <Grid container columnSpacing={3} rowSpacing={4} className={classes.root}>
      {products?.map((product) => (
        <Grid item xs={3}>
          <ProductItem product={product} />
        </Grid>
      ))}
    </Grid>
  )
}
