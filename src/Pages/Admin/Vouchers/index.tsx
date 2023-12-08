import { Box, Button } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { makeStyles } from 'tss-react/mui'
import { Voucher } from '../../../api/services/types'
import moment from 'moment'
import DataTable from '../../../components/DataTable/DataTable'
import CreateVoucherDialog from './CreateVoucherDialog'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AdminService } from '../../../api/services/admin'
import { useNotify } from '../../../components/Notify/hooks'
import { getCurrency } from '../../../utils/functions'
import VoucherStatusBadge from './VoucherStatusBadge'
import { VoucherStatus } from './functions'
import VoucherActionButton from '../../../components/DataTable/VoucherActionButton'

const useStyles = makeStyles()(() => ({
  info: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  tableContainer: {
    maxWidth: 'calc(100vw - 278px)',
  },
}))

const columns: GridColDef<Voucher>[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 80,
  },
  {
    field: 'name',
    type: 'string',
    headerName: 'Tên',
    width: 120,
  },
  {
    field: 'code',
    type: 'string',
    headerName: 'Code',
    width: 120,
  },
  {
    field: 'amount',
    type: 'string',
    headerName: 'Lượng giảm',
    width: 140,
    renderCell(params) {
      return getCurrency(params.row.amount)
    },
  },
  {
    field: 'maxUser',
    type: 'string',
    headerName: 'Tổng số',
    width: 120,
  },
  {
    field: 'used',
    type: 'string',
    headerName: 'Đã dùng',
    width: 120,
  },
  {
    field: 'createdAt',
    headerName: 'Ngày tạo',
    width: 135,
    type: 'string',
    renderCell: (params) => {
      return moment(params.row.createdAt).format('DD/MM/YYYY')
    },
  },
  {
    field: 'startedAt',
    headerName: 'Ngày bắt đầu',
    width: 135,
    type: 'string',
    renderCell: (params) => {
      return moment(params.row.createdAt).format('DD/MM/YYYY')
    },
  },
  {
    field: 'finishedAt',
    headerName: 'Ngày kết thúc',
    width: 135,
    type: 'string',
    renderCell: (params) => {
      return moment(params.row.createdAt).format('DD/MM/YYYY')
    },
  },
  {
    field: 'status',
    headerName: 'Trạng thái',
    width: 120,
    type: 'string',
    renderCell(params) {
      return <VoucherStatusBadge status={params.row.status as VoucherStatus} />
    },
  },
]

export default function Vouchers() {
  const { classes } = useStyles()
  const [open, setOpen] = useState(false)
  const { notifyError } = useNotify()

  const { data = [] } = useQuery({
    queryKey: ['vouchers'],
    async queryFn() {
      try {
        const res = await AdminService.getVouchers()
        return res
      } catch (err) {
        notifyError(err)
      }
    },
  })

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box className={classes.info}>
        <h1>Vouchers</h1>
        <Button onClick={handleOpen} variant="contained">
          Tạo Voucher
        </Button>
        <CreateVoucherDialog open={open} onClose={handleClose} />
      </Box>
      <Box className={classes.tableContainer}>
        <DataTable
          slug="vouchers"
          columns={columns}
          rows={data}
          rowAction={(params) => <VoucherActionButton voucher={params.row} />}
        />
      </Box>
    </>
  )
}
