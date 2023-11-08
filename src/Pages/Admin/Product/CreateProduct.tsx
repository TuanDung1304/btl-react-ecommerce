import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
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
import { flatten } from 'lodash'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { makeStyles } from 'tss-react/mui'
import { CATEGORIES } from '../../../components/Categories/categories'
import { useFilestack } from '../../../hooks'
import { Size } from '../../Products/type'
import EditProductModels from './EditProductModels'
import { COLORS, MenuProps } from './const'
import { CreateProductForm, CreateProductModel } from './types'

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

const filter = createFilterOptions<string>()

export default function CreateProduct() {
  const { classes } = useStyles()
  const picker = useFilestack()
  const thumbnailPicker = picker({
    onUploadDone: (file) => console.log(file),
  })

  const { register, handleSubmit, setValue, watch, getValues } =
    useForm<CreateProductForm>()
  const models = watch('productModels')

  const [open, setOpen] = useState(false)
  const [sizes, setSizes] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])

  useEffect(() => {
    const allModels = flatten(
      sizes?.map((size) => {
        return colors?.map((color) => {
          return { size, color, quantity: 0 }
        })
      }),
    ) as CreateProductModel[]
    const oldModels = getValues('productModels')

    const newModels = allModels.map<CreateProductModel>((model) => {
      const oldModel = oldModels.find(
        (oldModel) =>
          oldModel.color === model.color && oldModel.size === model.size,
      )
      return oldModel ?? model
    })

    setValue('productModels', newModels)
  }, [sizes, colors])

  const handleClose = () => {
    setOpen(false)
  }

  const handleSizesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value
    setSizes(typeof value === 'string' ? value.split(',') : value)
  }

  const handleProductModelsEdit = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
  ) => {
    const index = models.findIndex((model) => model.size + model.color === key)
    const newModels = [
      ...models.slice(0, index),
      { ...models[index], quantity: Number(e.target.value) },
      ...models.slice(index + 1),
    ]

    setValue('productModels', newModels)
  }

  const onSubmit = (data: CreateProductForm) => {
    console.log(data)
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box className={classes.root}>
        <Box sx={{ mt: 1 }}>
          <Typography variant="h5">Create Product</Typography>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            onClick={() => thumbnailPicker.open()}
            startIcon={<CloudUploadIcon />}>
            Upload thumbnail
          </Button>

          <Button
            sx={{ mt: 2 }}
            variant="contained"
            onClick={() => thumbnailPicker.open()}
            startIcon={<CloudUploadIcon />}>
            Upload thumbnail
          </Button>

          <TextField
            id="name"
            margin="normal"
            fullWidth
            label="Name"
            autoFocus
            {...register('name')}
          />
          <Autocomplete
            id="categories-autocomplete"
            options={CATEGORIES}
            value={CATEGORIES.find(
              (category) => category.url === watch('categoryId'),
            )}
            onChange={(_e, option) => setValue('categoryId', option?.url)}
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
            {...register('price')}
          />
          <TextField
            id="text"
            margin="normal"
            label="Description"
            fullWidth
            type="text"
            multiline
            rows={4}
            {...register('description')}
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
          <EditProductModels
            models={models}
            open={open}
            onClose={handleClose}
            onChange={handleProductModelsEdit}
            onSubmit={handleSubmit(onSubmit)}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => setOpen(true)}>
                Continue
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
