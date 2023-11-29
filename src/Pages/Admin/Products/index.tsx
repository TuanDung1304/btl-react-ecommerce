import { Box, Button, Divider } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import { ProductService } from '../../../api/services/products'
import { ListProductsData } from '../../../api/services/types'
import DataTable from '../../../components/DataTable/DataTable'
import ProductActionButtons from '../../../components/DataTable/ProductActionButtons'
import { Dialog } from '../../../components/Dialog'
import DialogTitle from '../../../components/Dialog/DialogTitle'
import { useNotify } from '../../../components/Notify/hooks'
import CreateProduct from './CreateAndEditProduct/CreateProduct'

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

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  {
    field: 'img',
    headerName: 'Hình ảnh',
    width: 100,
    sortable: false,
    renderCell: (params) => {
      return <img src={params.row.thumbnail} alt="" />
    },
  },
  {
    field: 'name',
    type: 'string',
    headerName: 'Tên sản phẩm',
    width: 300,
  },
  {
    field: 'modelsCount',
    type: 'string',
    headerName: 'Models',
    width: 100,
  },
  {
    field: 'price',
    type: 'string',
    headerName: 'Giá',
    width: 120,
    renderCell(params) {
      return `${Number(params.row.price).toLocaleString()} ₫`
    },
  },
  {
    field: 'discountedPrice',
    type: 'string',
    headerName: 'Giá khuyến mãi',
    width: 150,
    renderCell(params) {
      const value = params.row.discountedPrice
      return value ? `${Number(value).toLocaleString()} ₫` : null
    },
  },
  {
    field: 'createdAt',
    headerName: 'Ngày tạo',
    width: 160,
    type: 'string',
    renderCell: (params) => {
      return moment(params.row.createdAt).format('DD/MM/YYYY')
    },
  },
  {
    field: 'inStock',
    headerName: 'Còn lại',
    width: 100,
    type: 'string',
  },
  {
    field: 'inCart',
    headerName: 'Trong giỏ hàng',
    width: 130,
    type: 'string',
  },
]

const Products = () => {
  const { classes } = useStyles()
  const { notifyError } = useNotify()
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState<ListProductsData[]>([])

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await ProductService.getProductsList()
        setProducts(res)
      } catch (error) {
        notifyError(error)
      }
    }
    fetch()
  }, [notifyError])

  return (
    <>
      <Box className={classes.info}>
        <h1>Products</h1>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Thêm sản phẩm
        </Button>
      </Box>
      <Box className={classes.tableContainer}>
        <DataTable
          slug="products"
          columns={columns}
          rows={products}
          rowAction={ProductActionButtons}
        />
      </Box>
      <Dialog open={open}>
        <DialogTitle onClose={handleClose}>Tạo sản phẩm</DialogTitle>
        <Divider />
        <CreateProduct onClose={handleClose} />
      </Dialog>
    </>
  )
}

export default Products
