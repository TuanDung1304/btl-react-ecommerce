import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Button, ButtonGroup } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import { useCurrentUser } from '../../hooks'

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
  loading?: boolean
  size?: 'small' | 'medium'
}

export default function AdjustQuantity({
  quantity,
  setQuantity,
  size = 'medium',
  loading,
}: Props) {
  const { changeCartBadge } = useCurrentUser()

  const [value, setValue] = useState(quantity)
  useEffect(() => {
    setValue(quantity)
  }, [quantity])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/[^0-9]/g, '')
    setValue(Number(sanitizedValue))
  }

  const handleDecrease = () => {
    if (value > 0) {
      setQuantity(value - 1)
    }
  }

  const handleIncrease = () => {
    setQuantity(value + 1)
  }

  const handleBlur = () => {
    setQuantity(value)
  }

  const { classes, cx } = useStyles({ size })
  return (
    <ButtonGroup variant="contained" className={classes.root}>
      <Button
        disabled={loading}
        className={cx(classes.quantityBtn, classes.quantityItem)}
        size="small"
        onClick={handleDecrease}>
        <RemoveIcon className={classes.icon} />
      </Button>
      <input
        className={cx(classes.quantityInput, classes.quantityItem)}
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />
      <Button
        disabled={loading}
        className={cx(classes.quantityBtn, classes.quantityItem)}
        size="small"
        onClick={handleIncrease}>
        <AddIcon className={classes.icon} />
      </Button>
    </ButtonGroup>
  )
}
