import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import { Voucher } from '../../api/services/types'
import EditVoucherDialog from '../../Pages/Admin/Vouchers/EditVoucherDialog'

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
    </Box>
  )
}
