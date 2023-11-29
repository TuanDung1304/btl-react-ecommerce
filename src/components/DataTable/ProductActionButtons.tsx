import { Box, Button, Dialog, Divider } from '@mui/material'
import { GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid'
import { useState } from 'react'
import EditProduct from '../../Pages/Admin/Products/CreateAndEditProduct/EditProduct'
import DeleteConfirmDialog from '../Dialog/DeleteConfirmDialog'
import DialogTitle from '../Dialog/DialogTitle'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {
    background: 'white',
    padding: '20px',
    '& .MuiDataGrid-toolbarContainer': {
      flexDirection: 'row-reverse',
    },
    img: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
  },

  action: {
    display: 'flex',
    gap: '15px',

    img: {
      width: '20px',
      height: '20px',
      cursor: 'pointer',
    },
  },

  actionButtonGroup: {
    display: 'flex',
    gap: 6,
    '& button': {
      padding: '2px 5px',
    },
  },
}))

export default function ProductActionButtons(
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>,
) {
  const { classes } = useStyles()
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const handleCloseDelete = () => {
    setOpenDelete(false)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  return (
    <>
      <Dialog open={openEdit}>
        <DialogTitle onClose={handleCloseEdit}>Edit Product</DialogTitle>
        <Divider />
        <EditProduct productId={params.row.id} onClose={handleCloseEdit} />
      </Dialog>
      {openDelete && (
        <DeleteConfirmDialog
          title="Xóa sản phẩm"
          content="Hành động này không thể khôi phục"
          onClose={handleCloseDelete}
          validConfirmation="Delete"
          onConfirmed={handleCloseDelete}
        />
      )}
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
      </Box>
    </>
  )
}
