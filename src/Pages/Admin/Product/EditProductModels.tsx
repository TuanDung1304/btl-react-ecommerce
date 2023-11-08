import { Box, Button, Divider, TextField } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { ChangeEvent } from 'react'
import { makeStyles } from 'tss-react/mui'
import { Dialog } from '../../../components/Dialog'
import DialogTitle from '../../../components/Dialog/DialogTitle'
import { CreateProductModel } from './types'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    margin: '0px 0 16px',
    gap: 10,
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  tableHeadRow: {
    th: {
      fontSize: 17,
      backgroundColor: '#ddd',
    },
  },
  tableBodyRow: {
    '&:last-child td, &:last-child th': { border: 0 },
    td: { fontWeight: 600 },
  },
}))

interface Props {
  models: CreateProductModel[]
  onChange: (
    value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
  ) => void
  onClose: () => void
  open: boolean
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>
}

export default function EditProductModels({
  models,
  onChange,
  onClose,
  open,
  onSubmit,
}: Props) {
  const { classes } = useStyles()
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle onClose={onClose}>Edit Product Models</DialogTitle>
      <Divider />
      <Box sx={{ px: 3, pt: 3, maxHeight: 500, overflow: 'auto' }}>
        <TableContainer className={classes.root}>
          <Table>
            <TableHead>
              <TableRow className={classes.tableHeadRow}>
                <TableCell align="center">Size</TableCell>
                <TableCell align="center">Color</TableCell>
                <TableCell align="center">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {models?.map((model) => (
                <TableRow
                  key={model.size + model.color}
                  className={classes.tableBodyRow}>
                  <TableCell align="center">{model.size}</TableCell>
                  <TableCell align="center">{model.color}</TableCell>
                  <TableCell align="center">
                    <TextField
                      size="small"
                      value={model.quantity}
                      onChange={(e) => onChange(e, model.size + model.color)}
                      sx={{ width: 50, '& input': { textAlign: 'center' } }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" sx={{ mb: 2 }} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ mb: 2 }} onClick={onSubmit}>
            Create
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
