import { Box, Typography } from '@mui/material'
import Slider, { Settings } from 'react-slick'
import { makeStyles } from 'tss-react/mui'
import BestSellerItemCard from '../../components/ui/BestSellerItemCard'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

export const initProducts = [
  {
    img: 'https://shopping-mall-fashion-store.com/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWw4IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f7fd5d5c3099d31ec02936da34a892f8511af135/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9MY21WemFYcGxTU0lOTWpjNGVETTNNVDRHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--e7564df6469ef8f2d59c47a840a9f96299f6205b/-app-tmp-photos-products-Women-Shirts%20and%20Blouses-printed%20shirt-green-AdobeStock_136218039.jpg',
    price: 50,
    name: 'Printed Shirt',
  },
  {
    img: 'https://shopping-mall-fashion-store.com/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWw4IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f7fd5d5c3099d31ec02936da34a892f8511af135/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9MY21WemFYcGxTU0lOTWpjNGVETTNNVDRHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--e7564df6469ef8f2d59c47a840a9f96299f6205b/-app-tmp-photos-products-Women-Shirts%20and%20Blouses-printed%20shirt-green-AdobeStock_136218039.jpg',
    price: 50,
    name: 'Printed Shirt',
  },
  {
    img: 'https://shopping-mall-fashion-store.com/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWw4IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f7fd5d5c3099d31ec02936da34a892f8511af135/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9MY21WemFYcGxTU0lOTWpjNGVETTNNVDRHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--e7564df6469ef8f2d59c47a840a9f96299f6205b/-app-tmp-photos-products-Women-Shirts%20and%20Blouses-printed%20shirt-green-AdobeStock_136218039.jpg',
    price: 50,
    name: 'Printed Shirt',
  },
  {
    img: 'https://shopping-mall-fashion-store.com/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWw4IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f7fd5d5c3099d31ec02936da34a892f8511af135/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9MY21WemFYcGxTU0lOTWpjNGVETTNNVDRHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--e7564df6469ef8f2d59c47a840a9f96299f6205b/-app-tmp-photos-products-Women-Shirts%20and%20Blouses-printed%20shirt-green-AdobeStock_136218039.jpg',
    price: 50,
    name: 'Printed Shirt',
  },
  {
    img: 'https://shopping-mall-fashion-store.com/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWw4IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f7fd5d5c3099d31ec02936da34a892f8511af135/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9MY21WemFYcGxTU0lOTWpjNGVETTNNVDRHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--e7564df6469ef8f2d59c47a840a9f96299f6205b/-app-tmp-photos-products-Women-Shirts%20and%20Blouses-printed%20shirt-green-AdobeStock_136218039.jpg',
    price: 50,
    name: 'Printed Shirt',
  },
  {
    img: 'https://shopping-mall-fashion-store.com/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWw4IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f7fd5d5c3099d31ec02936da34a892f8511af135/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9MY21WemFYcGxTU0lOTWpjNGVETTNNVDRHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--e7564df6469ef8f2d59c47a840a9f96299f6205b/-app-tmp-photos-products-Women-Shirts%20and%20Blouses-printed%20shirt-green-AdobeStock_136218039.jpg',
    price: 50,
    name: 'Printed Shirt',
  },
  {
    img: 'https://shopping-mall-fashion-store.com/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWw4IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f7fd5d5c3099d31ec02936da34a892f8511af135/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9MY21WemFYcGxTU0lOTWpjNGVETTNNVDRHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--e7564df6469ef8f2d59c47a840a9f96299f6205b/-app-tmp-photos-products-Women-Shirts%20and%20Blouses-printed%20shirt-green-AdobeStock_136218039.jpg',
    price: 50,
    name: 'Printed Shirt',
  },
]

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
        {initProducts.map(({ img, name, price }, index) => (
          <BestSellerItemCard name={name} price={price} url={img} key={index} />
        ))}
      </Slider>
    </Box>
  )
}
