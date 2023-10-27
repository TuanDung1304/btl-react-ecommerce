import { Box } from '@mui/material'
import ProductImageSlider from './ProductImageSlider'
import { makeStyles } from 'tss-react/mui'
import ProductInfo from './ProductInfo'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
  },
  productSku: {},
}))
export default function ProductDetail() {
  const { classes } = useStyles()

  return (
    <Box className={classes.root}>
      <ProductImageSlider />
      <ProductInfo />
    </Box>
  )
}
