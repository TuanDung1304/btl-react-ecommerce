import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import { Voucher } from '../../api/services/types'
import EditVoucherDialog from '../../Pages/Admin/Vouchers/EditVoucherDialog'
import ConfirmDialog from '../Dialog/ConfirmDialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AdminService } from '../../api/services/admin'
import { useNotify } from '../Notify/hooks'

const useStyles = makeStyles()(() => ({
  actionButtonGroup: {
    display: 'flex',
    gap: 6,
    '& button': {
      padding: '2px 5px',
    },
  },
}))

interface Props {
  voucher: Voucher
}

export default function VoucherActionButton({ voucher }: Props) {
  const { classes } = useStyles()
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const { notify, notifyError } = useNotify()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: ['deteteVoucher'],
    async mutationFn() {
      try {
        const res = await AdminService.deleteVoucher({ id: voucher.id })
        notify(res.message)
      } catch (err) {
        notifyError(err)
      }
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['vouchers'] })
    },
  })

  return (
    <Box className={classes.actionButtonGroup}>
      <Button
        variant="contained"
        color="success"
        onClick={() => setOpenEdit(true)}>
        Sửa
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => setOpenDelete(true)}>
        Xóa
      </Button>
      <EditVoucherDialog
        onClose={() => setOpenEdit(false)}
        open={openEdit}
        voucher={voucher}
      />
      {openDelete && (
        <ConfirmDialog
          title="Xóa Voucher"
          onConfirm={mutate}
          content="Bạn có chắc muốn xóa voucher này?"
          onClose={() => setOpenDelete(false)}
        />
      )}
    </Box>
  )
}
