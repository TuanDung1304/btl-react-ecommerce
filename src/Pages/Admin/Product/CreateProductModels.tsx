import { CreateProductModel } from './types'
import { Box, Modal, TextField } from '@mui/material'
import { ChangeEvent } from 'react'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    margin: '8px 0 16px',
    gap: 10,
  },
}))

interface Props {
  model: CreateProductModel
  onChange: (value: ChangeEvent<HTMLInputElement>) => void
}

export default function CreateProductModels({ model, onChange }: Props) {
  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      <TextField label="Size" value={model.size} disabled />
      <TextField label="Color" value={model.color} disabled />
      <TextField
        label="Quantity"
        type="number"
        value={model.quantity}
        onChange={onChange}
      />
    </Box>
  )
}
