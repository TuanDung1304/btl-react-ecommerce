import { Box, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {
    maxWidth: 1200,
    width: '100%',
  },
  name: {
    fontSize: 18,
    letterSpacing: 1,
    marginTop: 10,
    lineHeight: '20px',
  },
  price: {
    fontSize: 20,
    fontWeight: 600,
    marginTop: 10,
    lineHeight: '20px',
  },
}))

interface Props {
  url: string
  price: number
  name: string
}

export default function BestSellerItemCard({ name, price, url }: Props) {
  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      <img src={url} />
      <Typography className={classes.name}>{name}</Typography>
      <Typography className={classes.price}>{`$${price}`}</Typography>
    </Box>
  )
}
