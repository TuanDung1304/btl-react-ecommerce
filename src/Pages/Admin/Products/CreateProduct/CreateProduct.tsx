import {
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
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
import EditProductModels from './EditProductModels'
import UploadImage from './UploadImage'
import { COLORS, MenuProps } from './const'
import { CreateProductForm, CreateProductModel } from './types'
import { isAxiosError } from 'axios'
import { CATEGORIES } from '../../../../components/Categories/categories'
import { ProductService } from '../../../../api/services/products'
import { useNotify } from '../../../../components/Notify/hooks'
import { Size } from '../../../Products/type'

const useStyles = makeStyles()(() => ({
  root: {
    fontFamily: 'Roboto, sans-serif',
  },
  uploadBtnGroup: {
    display: 'flex',
    flexDirection: 'column',
    '& button': {
      alignSelf: 'flex-start',
      marginBottom: 12,
    },
  },
  thumbnail: {
    maxHeight: 350,
    objectFit: 'contain',
  },
  imageListItem: {
    position: 'relative',
    '&:hover button': {
      backgroundColor: 'white',
    },
  },
  deleteImageBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
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

interface Props {
  onClose: () => void
}

export default function CreateProduct({ onClose }: Props) {
  const { classes } = useStyles()
  const { notify } = useNotify()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<CreateProductForm>()
  const { productModels: models, categoryId } = watch()

  // to validate input after first submit
  const [firstSubmit, setFirstSubmit] = useState(false)

  const [openEditModels, setOpenEditModels] = useState(false)
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

  const onSubmit = async (data: CreateProductForm) => {
    try {
      const res = await ProductService.createProducts({
        ...data,
        price: Number(data.price),
      })

      notify(res.message)
      onClose()
    } catch (err) {
      if (isAxiosError(err)) {
        notify(err.response?.data.message, { severity: 'error' })
      }
    }
  }

  return (
    <Container
      component="main"
      sx={{ overflowY: 'auto', overflowX: 'hidden', width: 600 }}>
      <Box className={classes.root}>
        <Box sx={{ mt: 1 }}>
          <UploadImage
            setValue={setValue}
            watch={watch}
            firstSubmit={firstSubmit}
          />
          <TextField
            id="name"
            margin="normal"
            fullWidth
            label="Name"
            autoFocus
            helperText={errors.name?.message}
            error={Boolean(errors.name?.message)}
            {...register('name', {
              required: { value: true, message: 'Khong duoc bo trong' },
            })}
          />
          <Autocomplete
            id="categories-autocomplete"
            options={CATEGORIES}
            value={CATEGORIES.find((category) => category.url === categoryId)}
            onChange={(_e, option) => setValue('categoryId', option?.url)}
            groupBy={(option) => option.type}
            getOptionLabel={(option) => option.name}
            sx={{ margin: '16px 0 8px' }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categories"
                helperText={firstSubmit && !categoryId && 'Khong duoc bo trong'}
                error={firstSubmit && !categoryId}
              />
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
            helperText={errors.price?.message}
            error={Boolean(errors.price?.message)}
            {...register('price', {
              required: { value: true, message: 'Khong duoc bo trong' },
            })}
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
          <FormControl
            fullWidth
            margin="normal"
            error={firstSubmit && !sizes.length}>
            <InputLabel>Size</InputLabel>
            <Select
              multiple
              value={sizes}
              onChange={handleSizesChange}
              input={<OutlinedInput label="Size" />}
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
            {firstSubmit && !sizes.length && (
              <FormHelperText>Chon it nhat mot size</FormHelperText>
            )}
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
                helperText={
                  firstSubmit && !colors.length && 'Chon it nhat mot mau'
                }
                error={firstSubmit && !colors.length}
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
            open={openEditModels}
            onClose={() => setOpenEditModels(false)}
            onChange={handleProductModelsEdit}
            onSubmit={handleSubmit(onSubmit)}
            setFirstSubmit={setFirstSubmit}
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
                onClick={() => setOpenEditModels(true)}>
                Continue
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
