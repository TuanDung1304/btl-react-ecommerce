import { Box, Grid, Pagination, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import { ProductService } from '../../api/services/products'
import { useNotify } from '../../components/Notify/hooks'
import ProductItem from '../../components/ui/ProductItem'
import { useProductFilter } from './functions'
import { Product } from './type'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
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
  const { notifyError } = useNotify()
  const params = useParams()
  const [products, setProducts] = useState<Product[]>([])
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ProductService.getProducts(
          params.collection ?? '',
          filter,
        )
        setProducts(res.products)
        if (totalPages !== res.totalPage) {
          setTotalPages(res.totalPage)
        }
      } catch (err) {
        notifyError(err)
      }
    }
    fetchData()
  }, [params, filter, totalPages, notifyError])

  return (
    <Box className={classes.root}>
      {!totalPages ? (
        <Box margin="auto">
          <Typography fontSize={22} fontWeight={500}>
            Không có sản phẩm nào
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container columnSpacing={3} rowSpacing={4}>
            {products?.map((product) => (
              <Grid item xs={6} md={4} lg={3}>
                <ProductItem product={product} />
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2} marginTop={4}>
            <Pagination
              count={totalPages}
              page={filter.page}
              variant="outlined"
              shape="rounded"
              className={classes.pagination}
              onChange={(_e, value) => setProductFilter({ page: value })}
            />
          </Stack>
        </>
      )}
    </Box>
  )
}
