import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { CartItemData } from '../../api/services/types'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
  },
  thumbnail: {
    width: 80,
    objectFit: 'contain',
  },
  info: {},
}))

interface Props {
  cartItem: CartItemData['cartItems'][number]
}

export default function CartItem({ cartItem }: Props) {
  const { productModel } = cartItem
  const { product } = productModel
  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      <img
        src={cartItem.productModel.product.thumbnail}
        className={classes.thumbnail}
      />
      <Box className={classes.info}>
        <Typography>{product.name}</Typography>
        <Typography>{`${productModel.color}/${productModel.size}`}</Typography>
        <Typography>{`${(
          product.discountedPrice ?? product.price
        ).toLocaleString()}`}</Typography>
      </Box>

      <Box></Box>
    </Box>
  )
}
