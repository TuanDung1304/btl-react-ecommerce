import { Box, Typography } from '@mui/material'
import Slider, { Settings } from 'react-slick'
import { makeStyles } from 'tss-react/mui'
import ProductItem from '../../components/ui/ProductItem'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Product } from '../Products/type'

export const initProducts = [
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury 123213213213123123123123123213123',
    model: '6AG2T011XPA',
    id: 1,
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
    id: 1,
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
    id: 1,
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
    id: 1,
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
    id: 1,
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
    id: 1,
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
    id: 1,
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
    id: 1,
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
    id: 1,
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
    id: 1,
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
    id: 1,
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
    id: 1,
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
    id: 1,
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
    id: 1,
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
    id: 1,
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
    id: 1,
  },
] as Product[]

const useStyles = makeStyles()(() => ({
  root: {
    maxWidth: 1200,
    width: '100%',
    marginTop: '35px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  slider: {
    width: '100%',
    marginTop: 15,

    '& .slick-slide': {
      display: 'flex',
      justifyContent: 'center',
    },
    '& .slick-arrow': {
      color: 'black',
    },
  },
}))

export default function BestSellerSlider() {
  const { classes } = useStyles()
  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    prevArrow: <ArrowBackIosIcon />,
    nextArrow: <ArrowForwardIosIcon />,
  }
  return (
    <Box className={classes.root}>
      <Typography textAlign={'center'} variant="h5" fontWeight={600}>
        Bestsellers
      </Typography>
      <Slider {...settings} className={classes.slider}>
        {initProducts.slice(8).map((product, index) => (
          <ProductItem product={product} key={index} />
        ))}
      </Slider>
    </Box>
  )
}
