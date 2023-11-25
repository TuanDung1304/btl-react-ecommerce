import { Box, Typography } from '@mui/material'
import Slider, { Settings } from 'react-slick'
import { makeStyles } from 'tss-react/mui'
import ProductItem from '../../components/ui/ProductItem'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useEffect, useState } from 'react'
import { Product } from '../Products/type'
import { ProductService } from '../../api/services/products'
import { useNotify } from '../../components/Notify/hooks'

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

const settings: Settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  arrows: true,
  prevArrow: <ArrowBackIosIcon />,
  nextArrow: <ArrowForwardIosIcon />,
}

export default function TrendingSlider() {
  const { classes } = useStyles()
  const { notifyError } = useNotify()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await ProductService.getTrendingProducts()
        setProducts(res)
      } catch (err) {
        notifyError(err)
      }
    }
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box className={classes.root}>
      <Typography textAlign={'center'} variant="h5" fontWeight={600}>
        Trending
      </Typography>
      <Slider {...settings} className={classes.slider}>
        {products.map((product, index) => (
          <ProductItem product={product} key={index} />
        ))}
      </Slider>
    </Box>
  )
}
