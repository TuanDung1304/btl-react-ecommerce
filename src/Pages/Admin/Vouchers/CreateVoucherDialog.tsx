import MutationVoucherForm from './MutationVoucherForm'
import { Dialog, DialogContent } from '@mui/material'
import DialogTitle from '../../../components/Dialog/DialogTitle'
import { useNotify } from '../../../components/Notify/hooks'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { VoucherForm } from './types'
import { AdminService } from '../../../api/services/admin'

interface Props {
  open: boolean
  onClose: () => void
}

export default function CreateVoucherDialog({ open, onClose }: Props) {
  const { notify, notifyError } = useNotify()
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const { mutate: onSubmit } = useMutation({
    mutationKey: ['createVoucher'],
    async mutationFn(data: VoucherForm) {
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
    <Dialog open={open}>
      <DialogTitle onClose={onClose}>Tạo Voucher</DialogTitle>
      <DialogContent>
        <MutationVoucherForm loading={loading} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}
