import { yupResolver } from '@hookform/resolvers/yup'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  styled,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import { CartService } from '../../api/services/cart'
import { useNotify } from '../../components/Notify/hooks'
import { provinces } from '../../provinces'
import CartItemPreview from './CartItemPreview'
import { CheckoutForm, checkoutSchema } from './validation'
import { OrderService } from '../../api/services/order'
import { getCurrency } from '../../utils/functions'
import { MIN_PRICE_TO_FREE_SHIP, SHIPMENT_COST } from './consts'
import { Voucher } from '../../api/services/types'
import { VoucherService } from '../../api/services/voucher'
import { isAxiosError } from 'axios'

const useStyles = makeStyles()(() => ({
  root: {
    '*': {
      fontFamily: 'Roboto !important',
    },
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    color: '#333333',
    backgroundColor: '#f6f6f6',
    width: '100%',
  },
  container: {
    width: 1100,
    display: 'flex',
  },
  main: {
    flex: 3,
    padding: '50px 50px 0 0',
  },
  side: {
    flex: 2,
    padding: '50px 0 0 50px',
  },
  title: {
    fontSize: 18,
    margin: '20px 0 12px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  radio: {
    padding: 18,
    border: '1px solid #d9d9d9',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
    '& span': {
      marginLeft: 10,
      color: '#737373',
      fontSize: 14,
    },
  },
  summaryContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    margin: '20px 0',
  },
  summary: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 14,
    color: '#969696',
  },
  price: {
    color: '#4b4b4b',
    fontSize: 14,
  },
}))

const Error = styled('span')({
  color: 'red',
})

export default function Checkout() {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const { notifyError, notify } = useNotify()
  const [voucher, setVoucher] = useState<Voucher>()
  const [code, setCode] = useState('')
  const [voucherMessage, setVoucherMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CheckoutForm>({ resolver: yupResolver(checkoutSchema) })

  const [provinceState, setProvinceState] = useState('')
  const [districtState, setDistrictState] = useState('')

  const onSubmit = async (data: CheckoutForm) => {
    try {
      const res = await OrderService.createOrder({
        ...data,
        voucherCode: voucher?.code,
      })
      notify(res.message)
      navigate('/account/my-orders')
    } catch (err) {
      notifyError(err)
    }
  }

  const { data } = useQuery({
    queryKey: ['cartdata'],
    queryFn: async () => {
      try {
        return await CartService.getCart()
      } catch (err) {
        notifyError(err)
      }
    },
  })

  useEffect(() => {
    if (data && !data.totalItem) {
      navigate('/cart')
    }
  }, [data, navigate])

  const fetchVoucher = useCallback(async () => {
    try {
      const res = await VoucherService.getVoucher(code)
      setVoucherMessage('')
      setVoucher(res)
      notify('Áp dụng voucher thành công')
    } catch (err) {
      if (isAxiosError(err)) {
        setVoucher(undefined)
        setVoucherMessage(err.response?.data.message)
      }
    }
  }, [code, notify])

  const shipmentCost =
    data?.totalPrice && data.totalPrice > MIN_PRICE_TO_FREE_SHIP
      ? 0
      : SHIPMENT_COST

  return (
    Boolean(data?.totalItem) && (
      <Box className={classes.root}>
        <Box className={classes.container}>
          <Box
            className={classes.main}
            component="form"
            onSubmit={handleSubmit(onSubmit)}>
            <Typography className={classes.title}>
              Thông tin giao hàng
            </Typography>
            <Grid container columnSpacing={1.5}>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  margin="dense"
                  fullWidth
                  label="Họ tên"
                  size="small"
                  {...register('name')}
                  error={!!errors.name}
                  helperText={
                    errors.name && <Error>{errors.name.message}</Error>
                  }
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="email"
                  type="email"
                  margin="dense"
                  fullWidth
                  label="Email"
                  size="small"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={
                    errors.email && <Error>{errors.email.message}</Error>
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="phone"
                  margin="dense"
                  fullWidth
                  label="Số điện thoại"
                  size="small"
                  {...register('phone')}
                  error={!!errors.phone}
                  helperText={
                    errors.phone && <Error>{errors.phone.message}</Error>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address"
                  margin="dense"
                  fullWidth
                  label="Địa chỉ"
                  size="small"
                  {...register('address')}
                  error={!!errors.address}
                  helperText={
                    errors.address && <Error>{errors.address.message}</Error>
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="province"
                  disablePortal
                  fullWidth
                  size="small"
                  options={provinces.map((province) => province.name)}
                  value={provinceState}
                  onChange={(_e, newValue) => {
                    setProvinceState(newValue ?? '')
                    setValue('province', newValue ?? '')
                    setValue('district', '')
                    setDistrictState('')
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="dense"
                      label="Tỉnh thành"
                      error={!!errors.province}
                      helperText={
                        errors.province && (
                          <Error>{errors.province.message}</Error>
                        )
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="district"
                  disablePortal
                  fullWidth
                  size="small"
                  options={
                    provinces
                      .find((province) => province.name === provinceState)
                      ?.districts.map((district) => district.name) ?? []
                  }
                  value={districtState}
                  onChange={(_e, newValue) => {
                    setValue('district', newValue ?? '')
                    setDistrictState(newValue ?? '')
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="dense"
                      label="Quận / huyện"
                      error={!!errors.district}
                      helperText={
                        errors.district && (
                          <Error>{errors.district.message}</Error>
                        )
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Typography className={classes.title}>
              Phương thức vận chuyển
            </Typography>
            <Box className={classes.radio}>
              <RadioButtonCheckedIcon color="primary" />
              <span style={{ flex: 1 }}>Giao hàng tận nơi</span>
              <span>{getCurrency(shipmentCost)}</span>
            </Box>
            <Typography className={classes.title}>
              Phương thức thanh toán
            </Typography>
            <Box className={classes.radio}>
              <RadioButtonCheckedIcon color="primary" />
              <span>Thanh toán khi giao hàng (COD)</span>
            </Box>
            <Box className={classes.actions}>
              <Button variant="outlined" onClick={() => navigate('/cart')}>
                Giỏ hàng
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={!data?.cartItems.length}>
                Hoàn tất đơn hàng
              </Button>
            </Box>
          </Box>

          <Divider orientation="vertical" />

          <Box className={classes.side}>
            {data?.cartItems.map((item) => (
              <CartItemPreview
                key={item.id}
                quantity={item.quantity}
                productModel={item.productModel}
              />
            ))}
            <Divider />
            <Box
              className={classes.summary}
              component="form"
              onSubmit={(e) => {
                e.preventDefault()
                fetchVoucher()
              }}
              sx={{
                padding: '16px 0',
                gap: 1,
                alignItems: 'flex-start !important',
              }}>
              <Box flex={1}>
                <TextField
                  id="voucher"
                  size="small"
                  label="Mã giảm giá"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  fullWidth
                  error={!!voucherMessage}
                  helperText={voucherMessage}
                  onFocus={() => setVoucherMessage('')}
                  onBlur={(e) => {
                    if (e.target.value) {
                      fetchVoucher()
                    }
                  }}
                />
              </Box>
              <Button variant="contained" sx={{ height: 40 }} type="submit">
                Sử dụng
              </Button>
            </Box>
            <Divider />
            <Box className={classes.summaryContainer}>
              <Box className={classes.summary}>
                Tạm tính
                <Typography className={classes.price}>
                  {getCurrency(data?.totalPrice ?? 0)}
                </Typography>
              </Box>
              <Box className={classes.summary}>
                Phí vận chuyển
                <Typography className={classes.price}>
                  {getCurrency(shipmentCost)}
                </Typography>
              </Box>
              {voucher && (
                <Box className={classes.summary}>
                  Mã giảm giá
                  <Typography className={classes.price}>
                    {getCurrency(-voucher.amount)}
                  </Typography>
                </Box>
              )}
            </Box>
            <Divider />
            <Box className={classes.summary} marginTop={2}>
              <Typography color="#4b4b4b" fontSize={18}>
                Tổng cộng
              </Typography>
              <Typography color="#4b4b4b" fontSize={18}>
                {data?.totalPrice &&
                  getCurrency(
                    data.totalPrice + shipmentCost - (voucher?.amount || 0),
                  )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  )
}
