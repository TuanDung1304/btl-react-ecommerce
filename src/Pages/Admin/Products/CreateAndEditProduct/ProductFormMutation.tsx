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
import { flatten, uniq } from 'lodash'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { makeStyles } from 'tss-react/mui'
import { CATEGORIES } from '../../../../consts'
import { Size } from '../../../Products/type'
import EditProductModels from './EditModels'
import UploadImage from './UploadImage'
import { COLORS, MenuProps } from './const'
import { ProductForm, ProductModel } from './types'

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
  initForm?: ProductForm
  onSubmit: (form: ProductForm) => Promise<void>
}

export default function ProductFormMutation({
  onClose,
  initForm,
  onSubmit,
}: Props) {
  const { classes } = useStyles()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<ProductForm>({ defaultValues: initForm })
  const { productModels: models, categoryId } = watch()

  // to validate input after first submit
  const [firstSubmit, setFirstSubmit] = useState(false)
  const [openEditModels, setOpenEditModels] = useState(false)
  const [sizes, setSizes] = useState<string[]>(
    uniq(initForm?.productModels.map((model) => model.size)) ?? [],
  )
  const [colors, setColors] = useState<string[]>(
    uniq(initForm?.productModels.map((model) => model.color)) ?? [],
  )

  useEffect(() => {
    const allModels = flatten(
      sizes?.map((size) => {
        return colors?.map((color) => {
          return { size, color, quantity: 0 }
        })
      }),
    ) as ProductModel[]
    const currentModels = getValues('productModels')

    const newModels = allModels.map<ProductModel>((model) => {
      const currentModel = currentModels.find(
        (currentModel) =>
          currentModel.color === model.color &&
          currentModel.size === model.size,
      )
      return currentModel ?? model
    })

    setValue('productModels', newModels)
  }, [sizes, colors, getValues, setValue])

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

  return (
    <Container
      component="main"
      sx={{
        overflowY: 'auto',
        overflowX: 'hidden',
        width: 600,
        maxHeight: 800,
      }}>
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
            label="Tên sản phẩm"
            autoFocus
            helperText={errors.name?.message}
            error={Boolean(errors.name?.message)}
            {...register('name', {
              required: { value: true, message: 'Không được bỏ trống' },
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
                label="Danh mục"
                helperText={firstSubmit && !categoryId && 'Không được bỏ trống'}
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
            label="Giá"
            fullWidth
            type="number"
            helperText={errors.price?.message}
            error={Boolean(errors.price?.message)}
            {...register('price', {
              required: { value: true, message: 'Không được bỏ trống' },
            })}
          />
          {initForm && (
            <TextField
              id="discountedPrice"
              margin="normal"
              label="Giá khuyến mãi"
              fullWidth
              type="number"
              helperText={errors.discountedPrice?.message}
              error={Boolean(errors.discountedPrice?.message)}
              {...register('discountedPrice', {})}
            />
          )}
          <TextField
            id="text"
            margin="normal"
            label="Mô tả"
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
            <InputLabel>Kích cỡ</InputLabel>
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
              <FormHelperText>Chọn ít nhất một kích cỡ</FormHelperText>
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
                label="Màu sắc"
                margin="normal"
                helperText={
                  firstSubmit && !colors.length && 'Chọn ít nhất một màu sắc'
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
                filtered.push(`Thêm "${params.inputValue}"`)
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
            action={initForm ? 'Cập nhật' : 'Tạo sản phẩm'}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={onClose}>
                Hủy
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => setOpenEditModels(true)}>
                Tiếp tục
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
