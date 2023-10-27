import { Box, Divider, Typography } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()(() => ({
  root: {},
  name: { fontSize: 26, fontWeight: 700 },
  productSku: {
    display: 'flex',
    alignItems: 'center',
  },
  productSkuItem: {
    fontSize: 13,
    display: 'flex',
    alignItems: 'center',
  },
  productSkuValue: {
    fontSize: 13,
    fontWeight: 700,
    marginLeft: 5,
  },
  productSkuDivider: {
    margin: '0 5px',
  },
  priceBox: {
    display: 'flex',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fafafa',
    fontWeight: 600,
  },
  price: {
    color: '#ff2c26',
    fontSize: 20,
    fontWeight: 700,
    marginLeft: 70,
  },
}))

interface Props {
  name: string
  inStock: number
  brand: string
  price: number
  oldPrice?: number
}

export default function ProductInfo({}: Props) {
  const { classes } = useStyles()
  return (
    <Box className={classes.root}>
      <Typography className={classes.name}>
        Áo Polo trơn hiệu ứng ESTP041
      </Typography>

      <Box className={classes.productSku}>
        <Box className={classes.productSkuItem}>
          Ma san pham:
          <Typography className={classes.productSkuValue}>
            ESTP04172CV01SB_DCR-S
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          className={classes.productSkuDivider}
          variant="middle"
          flexItem
        />
        <Box className={classes.productSkuItem}>
          Tinh trang:
          <Typography className={classes.productSkuValue}>Con hang</Typography>
        </Box>
        <Divider
          orientation="vertical"
          className={classes.productSkuDivider}
          variant="middle"
          flexItem
        />
        <Box className={classes.productSkuItem}>
          Thuong hieu:
          <Typography className={classes.productSkuValue}>Biluxury</Typography>
        </Box>
      </Box>

      <Box className={classes.priceBox}>
        <span>Gia:</span>
        <Typography className={classes.price}>{'199,000₫'}</Typography>
      </Box>
    </Box>
  )
}
