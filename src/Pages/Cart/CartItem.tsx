import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { CartService } from '../../api/services/cart'
import { CartItemData } from '../../api/services/types'
import AdjustQuantity from '../../components/AdjustQuantity'
import { useNotify } from '../../components/Notify/hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    color: '#333333',
    padding: '10px',
    '&:not(:last-child)': {
      borderBottom: '1px solid #e7e7e7',
    },
  },
  thumbnail: {
    width: 80,
    objectFit: 'contain',
  },
  info: {
    flex: 1,
    paddingLeft: 20,
  },
  priceBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 5,
  },
}))

interface Props {
  cartItem: CartItemData['cartItems'][number]
}

export default function CartItem({ cartItem }: Props) {
  const { productModel, quantity } = cartItem
  const { product } = productModel
  const { classes } = useStyles()
  const queryClient = useQueryClient()
  const { notifyError } = useNotify()

  const { mutate } = useMutation({
    mutationKey: ['updateCartItem'],
    mutationFn: async (quantity: number) => {
      try {
        return await CartService.adjustQuantity({
          cartItemId: cartItem.id,
          quantity,
        })
      } catch (err) {
        notifyError(err)
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['cartdata'] })
    },
  })

  const handleChange = async (value: number) => {
    mutate(value)
  }

  return (
    <Box className={classes.root}>
      <img
        src={cartItem.productModel.product.thumbnail}
        className={classes.thumbnail}
      />
      <Box className={classes.info}>
        <Typography fontWeight={500}>{product.name}</Typography>
        <Typography
          fontSize={12}
          color="#777">{`${productModel.color} / ${productModel.size}`}</Typography>
        <Typography marginTop={1} color="#8f9bb3" fontWeight={600}>{`${(
          product.discountedPrice ?? product.price
        ).toLocaleString()}`}</Typography>
      </Box>
      <Box className={classes.priceBox}>
        <Typography fontWeight={700}>
          {(
            (product.discountedPrice ?? product.price) * quantity
          ).toLocaleString()}
          ₫
        </Typography>
        <AdjustQuantity
          quantity={quantity}
          setQuantity={handleChange}
          size="small"
        />
      </Box>
    </Box>
  )
}
