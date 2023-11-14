import ClearIcon from '@mui/icons-material/Clear'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { IconButton, ImageList, ImageListItem, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { makeStyles } from 'tss-react/mui'
import { CreateProductForm } from './types'
import { useFilestack } from '../../../../hooks'

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
      width: 200,
    },
  },
  thumbnail: {
    height: 350,
    width: 'fit-content',
    overflow: 'hidden',
    '& img': {
      height: '100%',
      width: 'auto',
    },
  },
  imageListItem: {
    position: 'relative',
    '&:hover button': {
      backgroundColor: 'white',
    },
  },
  deleteImageBtn: {
    position: 'absolute',
    width: '25px !important',
    height: 25,
    top: 2,
    right: 2,
  },
  error: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: -8,
    marginLeft: 12,
  },
}))

interface Props {
  watch: UseFormWatch<CreateProductForm>
  setValue: UseFormSetValue<CreateProductForm>
  firstSubmit: boolean
}

export default function UploadImage({ setValue, watch, firstSubmit }: Props) {
  const { classes, cx } = useStyles()

  const { images = [], thumbnail } = watch()

  const picker = useFilestack()
  const thumbnailPicker = picker({
    onUploadDone: (file) => setValue('thumbnail', file.filesUploaded[0].url),
  })
  const imageListPicker = picker({
    onUploadDone: (files) =>
      setValue('images', [
        ...images,
        ...files.filesUploaded.map((file) => ({ url: file.url })),
      ]),
    maxFiles: 10,
  })

  const handleRemoveImage = (url: string) => {
    setValue(
      'images',
      images.filter((img) => img.url !== url),
    )
  }

  return (
    <Box className={classes.uploadBtnGroup}>
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={() => thumbnailPicker.open()}
        startIcon={<CloudUploadIcon />}>
        Upload thumbnail
      </Button>
      {firstSubmit && !thumbnail && (
        <Typography className={classes.error}>
          Can them it nhat 1 hinh anh
        </Typography>
      )}
      {thumbnail && (
        <Box className={cx(classes.thumbnail, classes.imageListItem)}>
          <img src={`${thumbnail}`} loading="lazy" />
          <IconButton
            size="small"
            className={classes.deleteImageBtn}
            onClick={() => {
              setValue('thumbnail', '')
            }}>
            <ClearIcon />
          </IconButton>
        </Box>
      )}
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={() => imageListPicker.open()}
        startIcon={<CloudUploadIcon />}>
        Upload image list
      </Button>
      {firstSubmit && !images?.length && (
        <Typography className={classes.error}>
          Can them it nhat 1 hinh anh
        </Typography>
      )}
      {!!images?.length && (
        <ImageList sx={{ width: 500, maxHeight: 450 }} cols={3} rowHeight={164}>
          {images.map((item) => (
            <ImageListItem key={item.url} className={classes.imageListItem}>
              <img
                src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                loading="lazy"
              />
              <IconButton
                className={classes.deleteImageBtn}
                onClick={() => {
                  handleRemoveImage(item.url)
                }}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  )
}
