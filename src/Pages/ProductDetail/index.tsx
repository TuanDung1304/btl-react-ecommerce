import { Box } from '@mui/material'
import ProductImageSlider from './ProductImageSlider'
import { makeStyles } from 'tss-react/mui'
import ProductInfo from './ProductInfo'

const productDetail = {
  name: 'Áo Polo trơn hiệu ứng ESTP041',
  model: 'ESTP04172CV01SB_DCR-S',
  inStock: 999,
  brand: 'Biluxury',
  price: 199000,
  oldPrice: 450000,
}

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    width: '100%',
    padding: '30px 50px',
    gap: 20,
  },
  productSku: {},
}))
export default function ProductDetail() {
  const { classes } = useStyles()

  return (
    <Box className={classes.root}>
      <ProductImageSlider />
      <ProductInfo product={productDetail} />
    </Box>
  )
}
