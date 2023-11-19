import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Button, ButtonGroup } from '@mui/material'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles<{ size: 'small' | 'medium' }>()(
  (_theme, { size }) => ({
    root: {
      '& .MuiButtonGroup-grouped': {
        minWidth: 'auto',
      },
    },
    quantityItem: {
      width: size === 'small' ? 30 : 40,
      height: size === 'small' ? 30 : 40,
      border: '1px solid #dbdbdb !important',
      fontWeight: 600,
      padding: 0,
      minWidth: 'auto',
    },
    quantityBtn: {
      color: '#a4aaaf',
      minWidth: 'auto',
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
      minWidth: 'auto',
    },
    icon: {
      fontSize: size === 'small' ? '15px' : '20px',
    },
  }),
)

interface Props {
  quantity: number
  setQuantity: (value: number) => void
  size?: 'small' | 'medium'
}

export default function AdjustQuantity({
  quantity,
  setQuantity,
  size = 'medium',
}: Props) {
  const { classes, cx } = useStyles({ size })
  return (
    <ButtonGroup variant="contained" className={classes.root}>
      <Button
        className={cx(classes.quantityBtn, classes.quantityItem)}
        size="small"
        onClick={() => {
          if (quantity > 1) {
            setQuantity(quantity - 1)
          }
        }}>
        <RemoveIcon className={classes.icon} />
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
        <AddIcon className={classes.icon} />
      </Button>
    </ButtonGroup>
  )
}
