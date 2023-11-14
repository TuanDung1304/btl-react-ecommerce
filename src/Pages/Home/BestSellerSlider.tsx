import { Box, Typography } from '@mui/material'
import Slider, { Settings } from 'react-slick'
import { makeStyles } from 'tss-react/mui'
import ProductItem from '../../components/ui/ProductItem'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

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
        {[].map((product, index) => (
          <ProductItem product={product} key={index} />
        ))}
      </Slider>
    </Box>
  )
}
