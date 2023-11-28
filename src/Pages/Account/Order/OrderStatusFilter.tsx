import { Box, Button } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { OrderStatus } from '../../../api/services/types'
import { colorFromStatus } from './functions'

const useStyles = makeStyles()((theme) => ({
  status: {
    opacity: 0.5,

    '&:hover': {
      opacity: 1,
    },
  },
  active: {
    opacity: 1,
  },
  badge: {
    fontFamily: 'Roboto',
    display: 'inline-block',
    fontSize: 'inherit',
    whiteSpace: 'nowrap',
    textTransform: 'none',
    color: theme.palette.text.primary,
  },
  dot: {
    display: 'inline-block',
    borderRadius: '50%',
    marginRight: '5px',
    width: '12px',
    height: '12px',
  },
}))

interface Props {
  status: OrderStatus
  count: number
  onClick: (status: OrderStatus) => void
  filtersValue: OrderStatus[]
}

export const OrderStatusFilter = ({
  status,
  count,
  onClick,
  filtersValue,
}: Props) => {
  const { classes, cx } = useStyles()
  const color = colorFromStatus(status)

  return (
    <Button
      variant="text"
      className={cx(classes.status, {
        [classes.active]: filtersValue?.includes(status),
      })}
      onClick={() => onClick(status)}>
      <Box>
        <span className={cx(classes.dot)} style={{ backgroundColor: color }} />
        <span className={classes.badge}>
          {count} {status}
        </span>
      </Box>
    </Button>
  )
}
