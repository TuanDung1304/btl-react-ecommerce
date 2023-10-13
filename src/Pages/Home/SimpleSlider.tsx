import { Box, Typography } from '@mui/material'
import Slider, { Settings } from 'react-slick'
import { makeStyles } from 'tss-react/mui'
import ProductItemCard from '../../components/ui/ProductItemCard'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

export const initProducts = [
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury 123213213213123123123123123213123',
    model: '6AG2T011XPA',
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
  },
  {
    img: 'https://product.hstatic.net/200000053174/product/7_7a6560a0e4f84c40bd5229028f78ecb8_master.jpg',
    price: 999000,
    name: 'Áo Khoác Gió 2 Lớp Biluxury',
    model: '6AG2T011XPA',
  },
]

const useStyles = makeStyles()(() => ({
  root: {
    maxWidth: 1400,
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

export default function SimpleSlider() {
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
        {initProducts.map(({ img, name, price, model }, index) => (
          <ProductItemCard
            name={name}
            price={price}
            url={img}
            key={index}
            model={model}
          />
        ))}
      </Slider>
    </Box>
  )
}
