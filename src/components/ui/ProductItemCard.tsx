import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Product } from '../../Pages/Products/type'

const useStyles = makeStyles()(() => ({
  root: {
    maxWidth: '300px',
    borderRadius: '8px',
  },
  imgWrapper: {
    width: '100%',
    height: '380px',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  brand: {
    marginTop: 6,
    color: '#8f8f8f',
    fontSize: 12,
    fontWeight: 700,
  },
  name: {
    fontSize: 13,
    letterSpacing: 0.3,
    lineHeight: '18px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  price: {
    fontSize: 14,
    fontWeight: 500,
    marginTop: 4,
    lineHeight: '20px',
  },
}))

interface Props {
  product: Product
}

export default function ProductItemCard({ product }: Props) {
  const { name, price, img, model } = product

  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      <Box className={classes.imgWrapper}>
        <img src={img} className={classes.img} />
      </Box>
      <Typography className={classes.brand}>Biluxury</Typography>
      <Typography className={classes.name}>{name + ' ' + model}</Typography>
      <Typography
        className={classes.price}>{`${price.toLocaleString()}₫`}</Typography>
    </Box>
  )
}
