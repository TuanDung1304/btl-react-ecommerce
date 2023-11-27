import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { MyOrder } from '../../api/services/types'
import { OrderService } from '../../api/services/order'
import { useNotify } from '../../components/Notify/hooks'

const columns: GridColDef<MyOrder>[] = [
  { field: 'id', headerName: 'Order ID', width: 90 },
  {
    field: 'createdAt',
    headerName: 'Date/Time',
    width: 150,
    resizable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'number',
    width: 110,
    editable: true,
    renderCell(params) {
      return 123
    },
  },
  {
    field: 'items',
    headerName: 'Items',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${
        params.row.cartItems.reduce((acc, item) => acc + item.quantity, 0) || ''
      }`,
  },
]

export default function Order() {
  const [rows, setRows] = useState<MyOrder[]>([])
  const { notifyError } = useNotify()

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await OrderService.myOrders()
        setRows(res)
      } catch (err) {
        notifyError(err)
      }
    }
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      <DataGrid
        columns={columns}
        rows={rows}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnMenu
        disableVirtualization
      />
    </Box>
  )
}
