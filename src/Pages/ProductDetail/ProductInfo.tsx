import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Divider,
  TextField,
  Typography,
} from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import RadioForm from './RadioForm'
import { useState } from 'react'
import { isNumber } from '../../utils/functions'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  infoHeader: {
    marginBottom: 20,
  },
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
  infoBobyItem: {
    display: 'flex',
    alignItems: 'center',
    padding: 15,
    fontWeight: 600,
  },
  priceBox: {
    gap: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },

  price: {
    color: '#ff2c26',
    fontSize: 20,
    fontWeight: 700,
    marginLeft: 50,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#9e9e9e',
  },
  buttonItem: {
    // width: 40,
    height: 40,
  },

  infoBody: {},
}))

interface Props {
  product: {
    name: string
    inStock: number
    model: string
    brand: string
    price: number
    oldPrice?: number
  }
}

export default function ProductInfo({
  product: { brand, inStock, model, name, price, oldPrice },
}: Props) {
  const { classes, cx } = useStyles()
  const [quantity, setQuantity] = useState(1)
  return (
    <Box className={classes.root}>
      <Box className={classes.infoHeader}>
        <Typography className={classes.name}>{name}</Typography>

        <Box className={classes.productSku}>
          <Box className={classes.productSkuItem}>
            Ma san pham:
            <Typography className={classes.productSkuValue}>{model}</Typography>
          </Box>
          <Divider
            orientation="vertical"
            className={classes.productSkuDivider}
            variant="middle"
            flexItem
          />
          <Box className={classes.productSkuItem}>
            Tinh trang:
            <Typography className={classes.productSkuValue}>
              {inStock ? 'Con hang' : 'Het cmn hang'}
            </Typography>
          </Box>
          <Divider
            orientation="vertical"
            className={classes.productSkuDivider}
            variant="middle"
            flexItem
          />
          <Box className={classes.productSkuItem}>
            Thuong hieu:
            <Typography className={classes.productSkuValue}>{brand}</Typography>
          </Box>
        </Box>
      </Box>

      <Box className={classes.infoBody}>
        <Box className={cx(classes.infoBobyItem, classes.priceBox)}>
          <span>Gia:</span>
          <Typography
            className={
              classes.price
            }>{`${price.toLocaleString()}₫`}</Typography>
          {oldPrice && (
            <>
              <Typography
                className={
                  classes.oldPrice
                }>{`${oldPrice.toLocaleString()}₫`}</Typography>
              <Chip
                label={`-${Math.floor((price / oldPrice) * 100)}%`}
                color="error"
                size="small"
              />
            </>
          )}
        </Box>
        <Box className={classes.infoBobyItem}>
          Màu sắc:
          <RadioForm />
        </Box>
        <Box className={classes.infoBobyItem}>
          Kích thước:
          <RadioForm />
        </Box>
        <Box className={classes.infoBobyItem}>
          Số lượng:
          <ButtonGroup variant="contained">
            <Button
              className={classes.buttonItem}
              size="small"
              onClick={() => {
                if (quantity > 0) {
                  setQuantity(quantity - 1)
                }
              }}>
              -
            </Button>
            <input
              value={quantity}
              onChange={(e) => {
                if (!e.target.value) setQuantity(0)
                if (isNumber(e.target.value)) {
                  setQuantity(Number(e.target.value))
                }
              }}
            />
            <Button
              className={classes.buttonItem}
              size="small"
              onClick={() => {
                setQuantity(quantity + 1)
              }}>
              +
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  )
}
