import { Box } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const useStyles = makeStyles()(() => ({
  root: {
    width: 370,
  },
}))

const imgs = [
  'https://product.hstatic.net/200000690725/product/estp041-1_6a52d5fd1f594e2b9acee2d830b78b58_master.jpg',
  'https://product.hstatic.net/200000690725/product/estp041-2_0fe28f88db44491aa3f4e7ce0daf884e_master.jpg',
  'https://product.hstatic.net/200000690725/product/estp041-4_0f2a7f2b52d645dab95a9cdd5fdee0f3_master.jpg',
  'https://product.hstatic.net/200000690725/product/estp041-5_2d4ac01b779044a4ba9e1e3343e328f9_master.jpg',
  'https://product.hstatic.net/200000690725/product/estp041-1_6a52d5fd1f594e2b9acee2d830b78b58_master.jpg',
  'https://product.hstatic.net/200000690725/product/estp041-2_0fe28f88db44491aa3f4e7ce0daf884e_master.jpg',
  'https://product.hstatic.net/200000690725/product/estp041-4_0f2a7f2b52d645dab95a9cdd5fdee0f3_master.jpg',
  'https://product.hstatic.net/200000690725/product/estp041-5_2d4ac01b779044a4ba9e1e3343e328f9_master.jpg',
]

export default function ProductImageSlider() {
  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      <Carousel emulateTouch showIndicators={false}>
        {imgs.map((img) => (
          <Box>
            <img src={img} alt="" />
          </Box>
        ))}
      </Carousel>
    </Box>
  )
}
