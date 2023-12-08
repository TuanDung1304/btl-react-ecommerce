import { Box, Button, Grid, Tooltip, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Order, OrderStatus } from '../../../api/services/types'
import { getCurrency } from '../../../utils/functions'
import { OrderStatusBadge } from './OrderStatusBadge'
import { useState } from 'react'
import ConfirmDialog from '../../../components/Dialog/ConfirmDialog'
import { OrderService } from '../../../api/services/order'
import { useNotify } from '../../../components/Notify/hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
    marginRight: 10,
  },
}))

interface Props {
  order: Order
}

export default function OrderItem({ order }: Props) {
  const { classes } = useStyles()
  const [cancelling, setCancelling] = useState(false)
  const { notifyError, notify } = useNotify()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['cancel-order'],
    async mutationFn() {
      try {
        const res = await OrderService.cancelOrder({ orderId: order.id })
        notify(res.message)
      } catch (err) {
        notifyError(err)
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })

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
      <Box display="flex">
        <Button className={classes.button} variant="contained">
          Xem chi tiết
        </Button>
        {order.status !== OrderStatus.Cancelled && (
          <Tooltip
            title={'Đơn hàng đã xử lý, không thể hủy.'}
            disableHoverListener={order.status === OrderStatus.Pending}>
            <Box width="fit-content">
              <Button
                className={classes.button}
                variant="contained"
                color="error"
                disabled={order.status !== OrderStatus.Pending}
                onClick={() => setCancelling(true)}>
                Hủy đơn
              </Button>
            </Box>
          </Tooltip>
        )}
        {cancelling && (
          <ConfirmDialog
            onClose={() => setCancelling(false)}
            onConfirm={mutate}
            title="Hủy đơn hàng"
            content="Bạn có chắc muốn hủy đơn hàng"
          />
        )}
      </Box>
    </Box>
  )
}
