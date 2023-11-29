import { Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import moment from 'moment'
import { makeStyles } from 'tss-react/mui'
import DataTable from '../../../components/DataTable/DataTable'
import { useCallback, useEffect, useState } from 'react'
import { AdminService } from '../../../api/services/admin'
import { AdminOrder, OrderStatus } from '../../../api/services/types'
import { useNotify } from '../../../components/Notify/hooks'
import { getCurrency } from '../../../utils/functions'
import EditOrderTableCell from './EditOrderTableCell'

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
  status: {
    cursor: 'pointer',
  },
}))

export default function AdminOrders() {
  const { classes } = useStyles()
  const { notifyError } = useNotify()
  const [rows, setRows] = useState<AdminOrder[]>([])

  const handleChangeStatus = useCallback(
    (rowId: number, value: OrderStatus) => {
      const updatedRows: AdminOrder[] = rows.map((row) =>
        row.id === rowId ? { ...row, status: value } : row,
      )
      setRows(updatedRows)
    },
    [rows],
  )

  const columns: GridColDef<AdminOrder>[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'totalProduct',
      type: 'string',
      headerName: 'Tổng sản phẩm',
      width: 150,
    },
    {
      field: 'totalModel',
      type: 'string',
      headerName: 'Tổng model',
      width: 150,
    },
    {
      field: 'totalPrice',
      type: 'string',
      headerName: 'Tổng giá',
      width: 150,
      renderCell(params) {
        return getCurrency(params.row.totalPrice)
      },
    },
    {
      field: 'userName',
      type: 'string',
      headerName: 'Khách hàng',
      width: 160,
    },
    {
      field: 'createdAt',
      headerName: 'Thời gian đặt',
      width: 150,
      type: 'string',
      renderCell: (params) => {
        return moment(params.row.createdAt).format('DD/MM/YYYY')
      },
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 150,
      cellClassName: classes.status,
      renderCell(params) {
        return (
          <EditOrderTableCell
            status={params.row.status}
            orderId={params.row.id}
            handleChangeStatus={handleChangeStatus}
          />
        )
      },
    },
  ]

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await AdminService.getOrders()
        setRows(res)
      } catch (err) {
        notifyError(err)
      }
    }
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Box className={classes.info}>
        <h1>Orders</h1>
      </Box>
      <Box className={classes.tableContainer}>
        <DataTable slug="products" columns={columns} rows={rows} />
      </Box>
    </>
  )
}
