import { useCallback, useEffect, useState } from 'react'
import DataTable from '../../../components/DataTable/DataTable'
import { GridColDef } from '@mui/x-data-grid'
import { makeStyles } from 'tss-react/mui'
import { useNotify } from '../../../components/Notify/hooks'
import { ProductService } from '../../../api/services/products'
import { ListProductsData } from '../../../api/services/types'
import { isAxiosError } from 'axios'
import { Box, Button, Divider } from '@mui/material'
import moment from 'moment'
import { Dialog } from '../../../components/Dialog'
import DialogTitle from '../../../components/Dialog/DialogTitle'
import CreateProduct from './CreateProduct/CreateProduct'

const useStyles = makeStyles()(() => ({
  root: {},
  info: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
}))

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  {
    field: 'img',
    headerName: 'Image',
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.thumbnail} alt="" />
    },
  },
  {
    field: 'name',
    type: 'string',
    headerName: 'Title',
    width: 300,
  },
  {
    field: 'modelsCount',
    type: 'string',
    headerName: 'Models',
    width: 120,
  },
  {
    field: 'price',
    type: 'string',
    headerName: 'Price',
    width: 150,
    renderCell(params) {
      return `${Number(params.row.price).toLocaleString()} ₫`
    },
  },
  {
    field: 'discountedPrice',
    type: 'string',
    headerName: 'Discounted Price',
    width: 150,
    renderCell(params) {
      const value = params.row.discountedPrice
      return value ? `${Number(value).toLocaleString()} ₫` : null
    },
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 160,
    type: 'string',
    renderCell: (params) => {
      return moment(params.row.createdAt).format('DD/MM/YYYY')
    },
  },
  {
    field: 'inStock',
    headerName: 'In Stock',
    width: 120,
    type: 'string',
  },
]

const Products = () => {
  const { classes } = useStyles()
  const { notify } = useNotify()
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState<ListProductsData[]>([])

  const handleClose = () => {
    setOpen(false)
  }

  const fetch = useCallback(async () => {
    try {
      const res = await ProductService.getProductsList()
      setProducts(res)
    } catch (error) {
      if (isAxiosError(error)) {
        notify(error.response?.data.message, { severity: 'error' })
      }
    }
  }, [])

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      <Box className={classes.info}>
        <h1>Products</h1>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add New Product
        </Button>
      </Box>
      <DataTable slug="products" columns={columns} rows={products} />
      <Dialog open={open}>
        <DialogTitle onClose={handleClose}>Create Product</DialogTitle>
        <Divider />
        <CreateProduct onClose={handleClose} />
      </Dialog>
    </>
  )
}

export default Products
