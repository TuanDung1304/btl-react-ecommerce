import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
  darken,
  lighten,
  styled,
} from '@mui/material'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import { CATEGORIES } from '../../../components/Categories/categories'
import FilePicker from '../../../components/FileStack'
import { Size } from '../../Products/type'
import { COLORS, MenuProps } from './const'
import { CreateProductModel } from './types'
import { flatten } from 'lodash'
import CreateProductModels from './CreateProductModels'

const useStyles = makeStyles()(() => ({
  root: {
    fontFamily: 'Roboto, sans-serif',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    boxShadow: '24px',
    bgcolor: 'background.paper',
    p: 4,
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

const filter = createFilterOptions<string>()

export default function CreateProduct() {
  const { classes } = useStyles()
  const [openPicker, setOpenPicker] = useState(false)
  const [sizes, setSizes] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [models, setModels] = useState<CreateProductModel[]>([])

  useEffect(() => {
    const newValue = flatten(
      sizes?.map((size) => {
        return colors?.map((color) => {
          return { size, color, quantity: 0 }
        })
      }),
    ) as CreateProductModel[]
    setModels(newValue)
  }, [sizes, colors])

  const handleSizesChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event
    setSizes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

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
          />

          <Autocomplete
            id="categories-autocomplete"
            options={CATEGORIES}
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
          <FormControl fullWidth margin="normal">
            <InputLabel id="multiple-chip-label">Size</InputLabel>
            <Select
              multiple
              value={sizes}
              onChange={handleSizesChange}
              input={<OutlinedInput id="select-multiple-chip" label="Size" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}>
              {Object.values(Size).map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Autocomplete
            multiple
            id="tags-standard"
            options={COLORS}
            value={colors}
            onChange={(_e, newValue) => {
              const addNew = [...newValue]
                .filter((item) => item.includes('Add "'))[0]
                ?.split('"')[1]

              if (addNew) {
                setColors((prev) => [...prev, addNew])
              } else {
                setColors(newValue)
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Colors"
                margin="normal"
              />
            )}
            filterOptions={(options, params) => {
              const filtered = filter(options, params)

              if (
                params.inputValue !== '' &&
                !colors.includes(params.inputValue)
              ) {
                filtered.push(`Add "${params.inputValue}"`)
              }

              return filtered
            }}
          />
          <Typography variant="h5">Edit Product Models</Typography>
          <Modal open={true} className={classes.modal}>
            <>
              {models.map((model, index) => (
                <CreateProductModels
                  key={index}
                  model={model}
                  onChange={(e) => {
                    setModels((prev) => {
                      const newValue = [...prev]
                      newValue[index].quantity = Number(e.target.value)
                      return newValue
                    })
                  }}
                />
              ))}
            </>
          </Modal>
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
