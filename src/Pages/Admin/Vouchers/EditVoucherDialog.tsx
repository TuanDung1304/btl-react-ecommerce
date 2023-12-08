import { Dialog, DialogContent } from '@mui/material'
import DialogTitle from '../../../components/Dialog/DialogTitle'
import MutationVoucherForm from './MutationVoucherForm'
import { Voucher } from '../../../api/services/types'
import moment from 'moment'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { VoucherForm } from './types'
import { AdminService } from '../../../api/services/admin'
import { useNotify } from '../../../components/Notify/hooks'
import { useMemo } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  voucher: Voucher
}

export default function EditVoucherDialog({ onClose, open, voucher }: Props) {
  const { notify, notifyError } = useNotify()
  const queryClient = useQueryClient()

  const initValue = useMemo<VoucherForm>(
    () => ({
      amount: voucher.amount,
      minOrderPrice: voucher.minOrderPrice,
      code: voucher.code,
      maxUser: voucher.maxUser,
      name: voucher.name,
      startedAt: moment(voucher?.startedAt).format(
        'yyyy-MM-DD',
      ) as unknown as Date,
      finishedAt: moment(voucher?.finishedAt).format(
        'yyyy-MM-DD',
      ) as unknown as Date,
    }),
    [voucher],
  )

  const { mutate: onSubmit, isPending } = useMutation({
    mutationKey: ['createVoucher'],
    async mutationFn(data: VoucherForm) {
      try {
        const res = await AdminService.editVouchers({
          ...data,
          finishedAt: new Date(data.finishedAt),
          startedAt: new Date(data.startedAt),
          amount: Number(data.amount),
          minOrderPrice: Number(data.minOrderPrice),
          maxUser: Number(data.maxUser),
        })
        notify(res.message)
        onClose()
      } catch (err) {
        notifyError(err)
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['vouchers'] })
    },
  })

  return (
    <Dialog open={open}>
      <DialogTitle onClose={onClose}>Chỉnh sửa Voucher</DialogTitle>
      <DialogContent>
        <MutationVoucherForm
          initValue={initValue}
          onSubmit={onSubmit}
          loading={isPending}
        />
      </DialogContent>
    </Dialog>
  )
}
