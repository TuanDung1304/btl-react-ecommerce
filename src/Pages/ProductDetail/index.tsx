import { Box } from '@mui/material'
import ProductImageSlider from './ProductImageSlider'
import { makeStyles } from 'tss-react/mui'
import ProductInfo from './ProductInfo'
import ProductTabs from './ProductTabs'
import { useCallback, useEffect, useState } from 'react'
import { ProductService } from '../../api/services/products'
import { useParams } from 'react-router-dom'
import { ProductDetailData } from './types'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 50px',
    maxWidth: 1600,
  },
  productSku: {},
}))
export default function ProductDetail() {
  const { classes } = useStyles()
  const param = useParams()

  const [product, setProduct] = useState<ProductDetailData>()

  const fetchData = useCallback(async () => {
    try {
      const res = await ProductService.getProductDetail(Number(param.id) ?? 0)
      setProduct(res)
    } catch (err) {}
  }, [param])

  useEffect(() => {
    fetchData()
  }, [param])

  return (
    <Box className={classes.root}>
      <Box display={'flex'} gap={3}>
        <ProductImageSlider images={product?.images} />
        {product && <ProductInfo product={product} />}
      </Box>
      <ProductTabs description={product?.description} />
    </Box>
  )
}
