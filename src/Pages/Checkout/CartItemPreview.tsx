import { Badge, Box, Typography } from '@mui/material'
import { CartItemData } from '../../api/services/types'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    height: 64,
    alignItems: 'center',
    margin: '10px 0',
    '& img': {
      width: 50,
      height: 64,
      objectFit: 'contain',
    },
    '& .MuiBadge-badge': {
      right: 3,
      top: 3,
    },
  },
  name: {
    color: '#4b4b4b',
    fontSize: 14,
  },
  info: {
    fontSize: 12,
    color: '#969696',
  },
}))

interface Props {
  productModel: CartItemData['cartItems'][number]['productModel']
  quantity: CartItemData['cartItems'][number]['quantity']
}

export default function CartItemPreview({ productModel, quantity }: Props) {
  const { classes } = useStyles()

  return (
    <Box className={classes.root}>
      <Badge badgeContent={quantity} color="primary">
        <img src={productModel.product.thumbnail} />
      </Badge>
      <Box flex={1} marginLeft={2}>
        <Typography className={classes.name}>
          {productModel.product.name}
        </Typography>
        <Typography
          className={
            classes.info
          }>{`${productModel.color} / ${productModel.size}`}</Typography>
      </Box>
      <Typography className={classes.name}>
        {`${(
          productModel.product.discountedPrice ?? productModel.product.price
        ).toLocaleString()}₫`}
      </Typography>
    </Box>
  )
}
