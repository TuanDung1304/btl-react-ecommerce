import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Divider,
  Grid,
  Typography,
  colors,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import RadioForm from './RadioForm'
import ProductSubInfo from './ProductSubInfo'
import { ProductDetailData } from './types'
import { uniq } from 'lodash'
import { sortSizes } from './functions'
import { discountPercent } from '../../utils/functions'

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
    padding: 15,
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
  quantityItem: {
    width: 40,
    height: 40,
    border: '1px solid #dbdbdb !important',
    fontWeight: 600,
  },
  quantityBtn: {
    color: '#a4aaaf',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
      color: '#000',
    },
  },
  quantityInput: {
    outline: 'none',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 15,
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
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState<string>()
  const [size, setSize] = useState<string>()

  const modelInstock = useMemo(() => {
    return (
      productModels.find(
        (model) => model.color === color && model.size === size,
      )?.quantity ?? 0
    )
  }, [color, size, productModels])

  const disableBtn =
    !color || !size || quantity > modelInstock || quantity === 0

  return (
    <Box className={classes.root}>
      <Box className={classes.infoWrapper}>
        <Box className={classes.infoHeader}>
          <Typography className={classes.name}>{name}</Typography>

          <Box className={classes.productSku}>
            <Box className={classes.productSkuItem}>
              Ma san pham:
              <Typography className={classes.productSkuValue}>{id}</Typography>
            </Box>
            <Divider
              orientation="vertical"
              className={classes.productSkuDivider}
              variant="middle"
              flexItem
            />
            <Box className={classes.productSkuItem}>
              Con lai:
              <Typography className={classes.productSkuValue}>
                {modelInstock}
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
              <Typography className={classes.productSkuValue}>
                Biluxury
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className={classes.infoBody}>
          <Box className={cx(classes.infoBobyItem, classes.priceBox)}>
            <span className={classes.infoBodyTitle}>Gia:</span>
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
                  label={discountPercent(price, discountedPrice)}
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
            <ButtonGroup variant="contained">
              <Button
                className={cx(classes.quantityBtn, classes.quantityItem)}
                size="small"
                onClick={() => {
                  if (quantity > 0) {
                    setQuantity(quantity - 1)
                  }
                }}>
                <RemoveIcon />
              </Button>
              <input
                className={cx(classes.quantityInput, classes.quantityItem)}
                value={quantity}
                onChange={(e) => {
                  if (!e.target.value) setQuantity(0)
                  if (!isNaN(Number(e.target.value))) {
                    setQuantity(Number(e.target.value))
                  }
                }}
              />
              <Button
                className={cx(classes.quantityBtn, classes.quantityItem)}
                size="small"
                onClick={() => {
                  setQuantity(quantity + 1)
                }}>
                <AddIcon />
              </Button>
            </ButtonGroup>
          </Box>
          <Grid
            container
            className={classes.actionContainer}
            rowGap={2}
            columnSpacing={2}>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined" disabled={disableBtn}>
                Them vao gio
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" disabled={disableBtn}>
                Mua ngay
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained">
                <span style={{ zIndex: 2 }}>Click vao day de nhan uu dai</span>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ProductSubInfo />
    </Box>
  )
}
