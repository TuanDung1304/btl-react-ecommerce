import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Order, OrderStatus } from '../../../api/services/types'
import { OrderService } from '../../../api/services/order'
import { useNotify } from '../../../components/Notify/hooks'
import OrderItem from './OrderItem'
import { OrderStatusFilter } from './OrderStatusFilter'
import { makeStyles } from 'tss-react/mui'
import { useQuery } from '@tanstack/react-query'

const useStyles = makeStyles()(() => ({
  root: {
    marginLeft: 50,
    minWidth: 1000,
  },
  orderHeader: {
    backgroundColor: '#f4f6f8',
    height: 50,
    display: 'flex',
    alignItems: 'center',
  },
  empty: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
  },
}))

export default function Orders() {
  const { classes } = useStyles()
  const [orders, setOrders] = useState<Order[]>([])
  const { notifyError } = useNotify()

  const { data = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      try {
        return await OrderService.myOrders()
      } catch (err) {
        notifyError(err)
      }
    },
  })

  const [filter, setFilter] = useState<OrderStatus[]>([])

  const toggleFilterStatus = (status: OrderStatus) => {
    if (filter.includes(status)) {
      setFilter((prev) => prev.filter((item) => item !== status))
    } else {
      setFilter((prev) => [...prev, status])
    }
  }

  const countOrdersByStatus = (status: OrderStatus) => {
    return data.filter((order) => order.status === status).length
  }

  useEffect(() => {
    setOrders(
      !filter.length
        ? data
        : data?.filter((item) => filter.includes(item.status)),
    )
  }, [data, filter])

  return (
    <Box className={classes.root}>
      <Box className={classes.orderHeader}>
        <Grid container spacing={1} justifyContent="flex-end" marginRight={2}>
          <Grid item>
            <OrderStatusFilter
              filtersValue={filter}
              onClick={toggleFilterStatus}
              count={countOrdersByStatus(OrderStatus.Pending)}
              status={OrderStatus.Pending}
            />
          </Grid>
          <Grid item>
            <OrderStatusFilter
              filtersValue={filter}
              onClick={toggleFilterStatus}
              count={countOrdersByStatus(OrderStatus.Delivering)}
              status={OrderStatus.Delivering}
            />
          </Grid>
          <Grid item>
            <OrderStatusFilter
              filtersValue={filter}
              onClick={toggleFilterStatus}
              count={countOrdersByStatus(OrderStatus.Completed)}
              status={OrderStatus.Completed}
            />
          </Grid>
          <Grid item>
            <OrderStatusFilter
              filtersValue={filter}
              onClick={toggleFilterStatus}
              count={countOrdersByStatus(OrderStatus.Cancelled)}
              status={OrderStatus.Cancelled}
            />
          </Grid>
        </Grid>
      </Box>
      {!orders.length ? (
        <Box className={classes.empty}>
          <Typography fontWeight={600} fontSize={20}>
            Không có đơn hàng nào
          </Typography>
        </Box>
      ) : (
        orders.map((order) => <OrderItem key={order.id} order={order} />)
      )}
    </Box>
  )
}
