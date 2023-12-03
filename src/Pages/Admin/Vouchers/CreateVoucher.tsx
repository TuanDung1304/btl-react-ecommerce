import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
} from '@mui/material'
import DialogTitle from '../../../components/Dialog/DialogTitle'
import { StyledInput } from '../../Account/Profile/StyledInput'
import { makeStyles } from 'tss-react/mui'
import { useForm } from 'react-hook-form'
import { CreateVoucherForm } from './types'
import { AdminService } from '../../../api/services/admin'
import { useNotify } from '../../../components/Notify/hooks'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useStyles = makeStyles()(() => ({
  voucherForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
}))

interface Props {
  open: boolean
  onClose: () => void
}

export default function CreateVoucher({ open, onClose }: Props) {
  const { classes } = useStyles()
  const { notify, notifyError } = useNotify()
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateVoucherForm>()

  const { mutate: onSubmit } = useMutation({
    mutationKey: ['createVoucher'],
    async mutationFn(data: CreateVoucherForm) {
      try {
        setLoading(true)
        const res = await AdminService.createVoucher({
          ...data,
          finishedAt: new Date(data.finishedAt),
          startedAt: new Date(data.startedAt),
          amount: Number(data.amount),
          maxUser: Number(data.maxUser),
        })
        notify(res.message)
        onClose()
      } catch (err) {
        notifyError(err)
      } finally {
        setLoading(false)
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['vouchers'] })
    },
  })

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle onClose={onClose}>Tạo Voucher</DialogTitle>
      <Divider />
      <DialogContent>
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
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
      </DialogContent>
    </Dialog>
  )
}
