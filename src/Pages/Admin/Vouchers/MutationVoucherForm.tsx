import { Box, Button, FormControl, Grid, InputLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import { makeStyles } from 'tss-react/mui'
import { StyledInput } from '../../Account/Profile/StyledInput'
import { VoucherForm } from './types'

const useStyles = makeStyles()(() => ({
  voucherForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
}))

interface Props {
  initValue?: VoucherForm
  loading?: boolean
  onSubmit: (data: VoucherForm) => void
}

export default function MutationVoucherForm({
  initValue,
  loading,
  onSubmit,
}: Props) {
  const { classes } = useStyles()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VoucherForm>({
    defaultValues: initValue,
  })

  return (
    <Box
      component="form"
      className={classes.voucherForm}
      onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid item xs={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink>Tên</InputLabel>
            <StyledInput
              id="name"
              {...register('name', { required: 'Không được bỏ trống' })}
              error={!!errors?.name}
              helperText={errors?.name?.message}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink>Code</InputLabel>
            <StyledInput
              id="code"
              {...register('code', { required: 'Không được bỏ trống' })}
              error={!!errors?.code}
              helperText={errors?.code?.message}
              disabled={!!initValue}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink>Giá trị (vnđ)</InputLabel>
            <StyledInput
              id="amount"
              type="number"
              {...register('amount', { required: 'Không được bỏ trống' })}
              error={!!errors?.amount}
              helperText={errors?.amount?.message}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink>Giá tối thiểu áp dụng (vnđ)</InputLabel>
            <StyledInput
              id="minOrderPrice"
              type="number"
              {...register('minOrderPrice', {
                required: 'Không được bỏ trống',
              })}
              error={!!errors?.minOrderPrice}
              helperText={errors?.minOrderPrice?.message}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink>Số lượng</InputLabel>
            <StyledInput
              id="maxUser"
              type="number"
              {...register('maxUser', { required: 'Không được bỏ trống' })}
              error={!!errors?.maxUser}
              helperText={errors?.maxUser?.message}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink>Ngày bắt đầu</InputLabel>
            <StyledInput
              id="startedAt"
              type="date"
              {...register('startedAt', {
                required: 'Không được bỏ trống',
              })}
              error={!!errors?.startedAt}
              helperText={errors?.startedAt?.message}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="standard" fullWidth>
            <InputLabel shrink>Ngày kết thúc</InputLabel>
            <StyledInput
              id="finishedAt"
              type="date"
              {...register('finishedAt', {
                required: 'Không được bỏ trống',
              })}
              error={!!errors?.finishedAt}
              helperText={errors?.finishedAt?.message}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Button variant="contained" type="submit" disabled={loading}>
        Xác nhận
      </Button>
    </Box>
  )
}
