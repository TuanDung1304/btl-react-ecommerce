import { Box, Grid, Pagination, Stack } from '@mui/material'
import { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import { ProductService } from '../../api/services/products'
import { useNotify } from '../../components/Notify/hooks'
import ProductItem from '../../components/ui/ProductItem'
import { Product } from './type'
import { useProductFilter } from './functions'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  pagination: {
    '& .MuiPagination-ul': {
      display: 'flex',
      justifyContent: 'center',
    },
  },
}))

export default function ProductList() {
  const { classes } = useStyles()
  const { filter, setProductFilter } = useProductFilter()
  const { notify } = useNotify()
  const params = useParams()
  console.log(filter)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetch')
      try {
        const res = await ProductService.getProducts(
          params.collection ?? '',
          filter,
        )
        setProducts(res.products)
        if (filter.totalPage !== res.totalPage) {
          setProductFilter({ totalPage: res.totalPage })
        }
      } catch (err) {
        if (isAxiosError(err)) {
          notify(err.response?.data.message)
        }
      }
    }
    fetchData()
  }, [params, filter])

  return (
    <Box className={classes.root}>
      <Grid container columnSpacing={3} rowSpacing={4}>
        {products?.map((product) => (
          <Grid item xs={3}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} marginTop={4}>
        <Pagination
          count={filter.totalPage}
          page={filter.page}
          variant="outlined"
          shape="rounded"
          className={classes.pagination}
          onChange={(e, value) => setProductFilter({ page: value })}
        />
      </Stack>
    </Box>
  )
}
