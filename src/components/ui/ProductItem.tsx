import { Box, Chip, Typography, colors } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { Product } from '../../Pages/Products/type'
import { Link } from 'react-router-dom'
import { discountPercent } from '../../utils/functions'

const useStyles = makeStyles()(() => ({
  root: {
    maxWidth: '300px',
    borderRadius: '8px',
  },
  imgWrapper: {
    width: '100%',
    height: '380px',
    overflow: 'hidden',
    display: 'block',
    position: 'relative',
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
    display: 'block',
    fontSize: 13,
    fontWeight: 500,
    fontFamily: 'roboto',
    letterSpacing: 0.3,
    lineHeight: '18px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  price: {
    fontSize: 13,
    fontWeight: 500,
    marginTop: 4,
    lineHeight: '20px',
    fontFamily: 'roboto',
  },
  percentChip: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.red[500],
    color: colors.grey[50],
    fontWeight: 600,
  },
}))

interface Props {
  product: Product
}

export default function ProductItem({ product }: Props) {
  const { name, price, thumbnail, id, discountedPrice } = product

  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      <Box
        component={Link}
        className={classes.imgWrapper}
        to={`/products/${id}`}>
        <img src={thumbnail} className={classes.img} />
        {discountedPrice && (
          <Chip
            className={classes.percentChip}
            label={discountPercent(price, discountedPrice)}
          />
        )}
      </Box>
      <Typography className={classes.brand}>Biluxury</Typography>
      <Typography
        component={Link}
        className={classes.name}
        to={`/products/${id}`}>
        {name}
      </Typography>
      <Typography className={classes.price}>{`${(
        discountedPrice ?? price
      ).toLocaleString()}₫`}</Typography>
    </Box>
  )
}
