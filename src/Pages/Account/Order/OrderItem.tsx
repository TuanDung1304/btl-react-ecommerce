import { Box, Button, Grid, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Order } from '../../../api/services/types'
import { getCurrency } from '../../../utils/functions'
import { OrderStatusBadge } from './OrderStatusBadge'

const useStyles = makeStyles()((theme) => ({
  root: {
    padding: '15px 20px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 5,
    marginTop: 20,

    '& p': {
      fontWeight: 500,
    },
  },

  button: {
    marginTop: 15,
  },
}))

interface Props {
  order: Order
}

export default function OrderItem({ order }: Props) {
  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      <Grid container rowSpacing={2}>
        <Grid item xs={4}>
          <Typography>
            <strong>Mã đơn hàng:</strong> {order.id}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            <strong>Tổng tiền:</strong> {getCurrency(order.totalPrice)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            <strong>Tổng số sản phẩm:</strong>{' '}
            {order.cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            <strong>Thời gian:</strong>{' '}
            {new Date(order.createdAt).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            <strong>Địa chỉ:</strong> {order.address}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>
            <strong>Trạng thái:</strong>{' '}
            <OrderStatusBadge status={order.status} />
          </Typography>
        </Grid>
      </Grid>
      <Button className={classes.button} variant="contained">
        Xem chi tiết
      </Button>
    </Box>
  )
}
