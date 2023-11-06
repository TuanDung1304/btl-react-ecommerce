import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Typography, darken, lighten, styled } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import { CATEGORIES } from '../../../components/Categories/categories'
import FilePicker from '../../../components/FileStack'

const useStyles = makeStyles()(() => ({
  root: {
    fontFamily: 'Roboto, sans-serif',
  },
}))

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}))

const GroupItems = styled('ul')({
  padding: 0,
})

export default function CreateProduct() {
  const { classes } = useStyles()
  const options = CATEGORIES

  const [openPicker, setOpenPicker] = useState(false)

  return (
    <Container component="main" maxWidth="sm">
      <Box className={classes.root}>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Typography variant="h5">Create Product</Typography>
          <Button
            component="label"
            variant="contained"
            onClick={() => setOpenPicker(!openPicker)}
            startIcon={<CloudUploadIcon />}>
            Upload thumbnail
          </Button>
          <FilePicker
            onClose={() => setOpenPicker(false)}
            open={openPicker}
            multiFiles
          />
          <TextField
            id="name"
            margin="normal"
            fullWidth
            label="Name"
            autoFocus
            required
          />
          <Autocomplete
            id="categories-autocomplete"
            options={options}
            groupBy={(option) => option.type}
            getOptionLabel={(option) => option.name}
            sx={{ margin: '16px 0 8px' }}
            renderInput={(params) => (
              <TextField {...params} label="Categories" />
            )}
            renderGroup={(params) => (
              <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>{params.children}</GroupItems>
              </li>
            )}
          />
          <TextField
            id="price"
            margin="normal"
            label="Price"
            fullWidth
            type="number"
          />
          <TextField
            id="text"
            margin="normal"
            label="Description"
            fullWidth
            type="text"
            multiline
            rows={4}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type="submit">
            Create
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
