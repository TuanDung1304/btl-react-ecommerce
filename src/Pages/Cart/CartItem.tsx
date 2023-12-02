import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { CartService } from '../../api/services/cart'
import { CartItemData } from '../../api/services/types'
import AdjustQuantity from '../../components/AdjustQuantity'
import { useNotify } from '../../components/Notify/hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from '../../components/ui/Link'
import { getCurrency } from '../../utils/functions'
import { useCurrentUser } from '../../hooks'

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
  const { changeCartBadge } = useCurrentUser()

  const { mutate, isPending } = useMutation({
    mutationKey: ['updateCartItem', cartItem.id],
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

  const handleUpdate = async (value: number, oldValue: number) => {
    mutate(value)
    changeCartBadge(value - oldValue)
  }

  return (
    <Box className={classes.root}>
      <Link to={`/product/${product.id}`}>
        <img
          src={cartItem.productModel.product.thumbnail}
          className={classes.thumbnail}
        />
      </Link>
      <Box className={classes.info}>
        <Typography
          fontWeight={600}
          fontSize={18}
          component={Link}
          underlineOnHover
          to={`/product/${product.id}`}>
          {product.name}
        </Typography>
        <Typography
          fontSize={13}
          color="#777">{`${productModel.color} / ${productModel.size}`}</Typography>
        <Typography marginTop={1} color="#8f9bb3" fontWeight={600}>
          {getCurrency(product.discountedPrice ?? product.price)}
        </Typography>
      </Box>
      <Box className={classes.priceBox}>
        <Typography fontWeight={700}>
          {getCurrency((product.discountedPrice ?? product.price) * quantity)}
        </Typography>
        <AdjustQuantity
          quantity={quantity}
          setQuantity={handleUpdate}
          size="small"
          loading={isPending}
        />
      </Box>
    </Box>
  )
}
