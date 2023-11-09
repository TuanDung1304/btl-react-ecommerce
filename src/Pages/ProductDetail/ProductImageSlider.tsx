import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const useStyles = makeStyles()(() => ({
  root: {
    width: 370,
  },
}))

interface Props {
  images?: {
    url: string
  }[]
}

export default function ProductImageSlider({ images }: Props) {
  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      <Carousel emulateTouch showIndicators={false}>
        {images?.map((img) => (
          <Box>
            <img src={img.url} alt="" />
          </Box>
        ))}
      </Carousel>
    </Box>
  )
}
