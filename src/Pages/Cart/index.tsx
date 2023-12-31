import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { makeStyles } from 'tss-react/mui'
import { CartService } from '../../api/services/cart'
import { useNotify } from '../../components/Notify/hooks'
import CartItem from './CartItem'
import { useNavigate } from 'react-router-dom'
import { BorderLinearProgress } from '../../components/ui/BorderedLinearProgress'
import { MIN_PRICE_TO_FREE_SHIP } from '../Checkout/consts'
import { getCurrency } from '../../utils/functions'

const useStyles = makeStyles()(() => ({
  root: {
    marginTop: 40,
    display: 'flex',
    width: '100%',
    padding: '0 25px',
    minHeight: 500,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemContainer: {
    padding: '8px 10px',
    border: '2px solid #e7e7e7',
    borderRadius: 8,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    position: 'sticky',
    top: 100,
  },
  cartInfo: {
    border: '1px solid #e7e7e7',
    padding: 20,
    '& hr': {
      margin: '15px 0',
    },
    '& li': {
      listStyle: 'inside',
      fontSize: 14,
      color: '#333333',
      letterSpacing: 0.4,
      '&:not(:last-child)': {
        marginBottom: 8,
      },
    },
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
  cartInfoSummary: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  term: {
    padding: 12,
    border: '1px solid #bce8f1',
    borderRadius: 8,
    backgroundColor: '#d9edf7',
  },
  voucher: {
    border: '1px solid #e7e7e7',
    padding: '8px 10px',
    minHeight: 60,
  },
}))

export default function Cart() {
  const { classes } = useStyles()
  const { notifyError } = useNotify()
  const navigate = useNavigate()
  const { data } = useQuery({
    queryKey: ['cartdata'],
    queryFn: async () => {
      try {
        const res = await CartService.getCart()
        return res
      } catch (err) {
        notifyError(err)
      }
    },
  })

  const progressValue =
    Math.floor((Number(data?.totalPrice) / MIN_PRICE_TO_FREE_SHIP) * 100) < 100
      ? Math.floor((Number(data?.totalPrice) / MIN_PRICE_TO_FREE_SHIP) * 100)
      : 100

  return (
    <Grid container className={classes.root} columnSpacing={3}>
      <Grid item md={7.5} xs={12}>
        <Box className={classes.header}>
          <Typography fontWeight={700} fontSize={24}>
            Giỏ hàng của bạn
          </Typography>
          <Typography>
            Bạn đang có <strong>{data?.totalItem ?? 0} sản phẩm</strong> trong
            giỏ hàng
          </Typography>
        </Box>
        <Divider sx={{ marginY: 2 }} />

        {!!data?.cartItems.length && (
          <>
            <Box>
              <Typography color="#666666">
                {Number(data?.totalPrice) > MIN_PRICE_TO_FREE_SHIP ? (
                  'Bạn đã được '
                ) : (
                  <>
                    Bạn cần mua thêm{' '}
                    <span
                      style={{ fontSize: 18, fontWeight: 600, color: 'red' }}>
                      {getCurrency(
                        MIN_PRICE_TO_FREE_SHIP - Number(data?.totalPrice),
                      )}
                    </span>{' '}
                    để được{' '}
                  </>
                )}
                <span
                  style={{ fontSize: 20, fontWeight: 600, color: '#333333' }}>
                  Miễn phí vận chuyển
                </span>
              </Typography>

              <BorderLinearProgress
                sx={{ margin: '20px 0' }}
                variant="determinate"
                value={progressValue}
                color={
                  Number(data?.totalPrice) >= MIN_PRICE_TO_FREE_SHIP
                    ? 'success'
                    : 'warning'
                }
              />
            </Box>
            <Box className={classes.cartItemContainer}>
              {data?.cartItems.map((item) => <CartItem cartItem={item} />)}
            </Box>
          </>
        )}
      </Grid>
      <Grid item md={4.5} xs={12}>
        <Box className={classes.infoContainer}>
          <Box className={classes.cartInfo}>
            <Typography fontSize={20} fontWeight={700}>
              Thông tin đơn hàng
            </Typography>
            <Divider />
            <Box className={classes.cartInfoSummary}>
              <Typography fontWeight={700} fontSize={18}>
                Tổng tiền:
              </Typography>
              <Typography fontWeight={700} color={'red'} fontSize={22}>
                {data?.totalPrice.toLocaleString()}₫
              </Typography>
            </Box>
            <Divider />
            <ul>
              <li>Phí vận chuyển sẽ được tính ở trang thanh toán.</li>
              <li>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</li>
            </ul>
            <Button
              variant="contained"
              className={classes.button}
              disabled={!data?.cartItems.length}
              onClick={() => navigate('/checkout')}>
              Thanh toán
            </Button>
          </Box>
          <Box className={classes.term}>
            <Typography>Chính sách mua hàng:</Typography>
            Hiện chúng tôi chỉ áp dụng thanh toán với đơn hàng có giá trị tối
            thiểu 0₫ trở lên.
          </Box>
          <Box className={classes.voucher}>
            <Typography>Khuyến mãi dành cho bạn:</Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
