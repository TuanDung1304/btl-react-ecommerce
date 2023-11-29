import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Typography,
  colors,
} from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import RadioForm from './RadioForm'
import ProductSubInfo from './ProductSubInfo'
import { ProductDetailData } from './types'
import { uniq } from 'lodash'
import { sortSizes } from './functions'
import { getDiscountPercent } from '../../utils/functions'
import { CartService } from '../../api/services/cart'
import { useNotify } from '../../components/Notify/hooks'
import AdjustQuantity from '../../components/AdjustQuantity'

const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '70%',
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '66%',
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
    padding: 12,
    fontWeight: 600,
  },
  infoBodyTitle: {
    minWidth: 120,
  },
  priceBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },

  price: {
    color: colors.red[500],
    fontSize: 20,
    fontWeight: 700,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#9e9e9e',
    margin: '0 20px',
  },
  infoBody: {},
  actionContainer: {
    width: '100%',
    marginTop: 10,
    '& .MuiGrid-item:first-child .MuiButton-root': {
      padding: '11px 28px',
    },

    '& .MuiButton-root': {
      fontWeight: 600,
      padding: '12px 28px',
      letterSpacing: '1px',
      fontSize: 15,
    },

    '& .MuiGrid-item:last-child .MuiButton-root': {
      background: '#333333',

      '&:after': {
        content: '""',
        position: 'absolute',
        background: 'black',
        borderRadius: 'inherit',
        left: 0,
        width: 0,
        height: '100%',
        transition: 'all .2s ease-in',
        overflow: 'hidden',
      },

      '&:hover:after': {
        background: 'black',
        borderRadius: 'inherit',
        width: '100%',
      },
    },
  },
}))

interface Props {
  product: ProductDetailData
}

export default function ProductInfo({
  product: { id, name, price, discountedPrice, productModels },
}: Props) {
  const { classes, cx } = useStyles()
  const { notifyError, notify } = useNotify()
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState<string>()
  const [size, setSize] = useState<string>()

  const addToCart = useCallback(async () => {
    try {
      const selectedModel = productModels.find(
        (model) => model.color === color && model.size === size,
      )
      const res = await CartService.addToCart({
        quantity,
        modelId: selectedModel?.id ?? 0,
      })
      notify(res.message)
    } catch (err) {
      notifyError(err)
    }
  }, [color, notify, notifyError, productModels, quantity, size])

  const modelInStock = useMemo(() => {
    return (
      productModels.find(
        (model) => model.color === color && model.size === size,
      )?.quantity ?? 0
    )
  }, [color, size, productModels])

  const disableBtn =
    !color || !size || quantity > modelInStock || quantity === 0

  return (
    <Box className={classes.root}>
      <Box className={classes.infoWrapper}>
        <Box className={classes.infoHeader}>
          <Typography className={classes.name}>{name}</Typography>

          <Box className={classes.productSku}>
            <Box className={classes.productSkuItem}>
              Mã sản phẩm:
              <Typography className={classes.productSkuValue}>{id}</Typography>
            </Box>
            <Divider
              orientation="vertical"
              className={classes.productSkuDivider}
              variant="middle"
              flexItem
            />
            <Box className={classes.productSkuItem}>
              Còn lại:
              <Typography className={classes.productSkuValue}>
                {modelInStock}
              </Typography>
            </Box>
            <Divider
              orientation="vertical"
              className={classes.productSkuDivider}
              variant="middle"
              flexItem
            />
            <Box className={classes.productSkuItem}>
              Thương hiệu:
              <Typography className={classes.productSkuValue}>
                Biluxury
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className={classes.infoBody}>
          <Box className={cx(classes.infoBobyItem, classes.priceBox)}>
            <span className={classes.infoBodyTitle}>Giá:</span>
            <Typography className={classes.price}>{`${(
              discountedPrice ?? price
            ).toLocaleString()}₫`}</Typography>
            {discountedPrice && (
              <>
                <Typography
                  className={
                    classes.oldPrice
                  }>{`${price.toLocaleString()}₫`}</Typography>
                <Chip
                  label={`-${getDiscountPercent(price, discountedPrice)}`}
                  sx={{ backgroundColor: colors.red[500], color: 'white' }}
                  size="small"
                />
              </>
            )}
          </Box>
          <Box className={classes.infoBobyItem}>
            <span className={classes.infoBodyTitle}>Màu sắc:</span>
            <RadioForm
              options={uniq(productModels.map((model) => model.color))}
              onSelect={setColor}
              value={color}
            />
          </Box>
          <Box className={classes.infoBobyItem}>
            <span className={classes.infoBodyTitle}>Kích thước:</span>
            <RadioForm
              options={sortSizes(
                uniq(productModels.map((model) => model.size)),
              )}
              onSelect={setSize}
              value={size}
            />
          </Box>
          <Box className={classes.infoBobyItem}>
            <span className={classes.infoBodyTitle}>Số lượng:</span>
            <AdjustQuantity quantity={quantity} setQuantity={setQuantity} />
          </Box>
          <Grid
            container
            className={classes.actionContainer}
            rowGap={2}
            columnSpacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                disabled={disableBtn}
                onClick={addToCart}>
                Thêm vào giỏ
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" disabled={disableBtn}>
                Mua ngay
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained">
                <span style={{ zIndex: 2 }}>Click vào đây để nhận ưu đãi</span>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ProductSubInfo />
    </Box>
  )
}
