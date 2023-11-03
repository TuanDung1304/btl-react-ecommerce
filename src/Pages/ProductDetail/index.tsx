import { Box } from '@mui/material'
import ProductImageSlider from './ProductImageSlider'
import { makeStyles } from 'tss-react/mui'
import ProductInfo from './ProductInfo'
import ProductTabs from './ProductTabs'

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
    flexDirection: 'column',
    padding: '30px 50px',
    maxWidth: 1600,
  },
  productSku: {},
}))
export default function ProductDetail() {
  const { classes } = useStyles()

  return (
    <Box className={classes.root}>
      <Box display={'flex'} gap={3}>
        <ProductImageSlider />
        <ProductInfo product={productDetail} />
      </Box>
      <ProductTabs />
    </Box>
  )
}
