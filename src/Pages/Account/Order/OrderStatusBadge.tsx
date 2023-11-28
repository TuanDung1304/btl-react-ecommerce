import { Box } from '@mui/material'
import React, { useMemo } from 'react'
import { makeStyles } from 'tss-react/mui'
import { OrderStatus } from '../../../api/services/types'
import { styleFromOrderStatus } from './functions'

const useStyles = makeStyles()(() => ({
  badge: {
    display: 'inline-block',
    fontSize: '12px',
    lineHeight: '1',
    fontWeight: 500,
    border: '1px solid',
    padding: '6px 8px',
    borderRadius: '5px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  dot: {
    fontSize: '12px',
    backgroundColor: 'transparent !important',
    marginRight: '6px',
  },
}))

interface Props {
  status: OrderStatus
}

export const OrderStatusBadge = ({ status }: Props) => {
  const { classes, cx } = useStyles()
  const style = useMemo<React.CSSProperties>(() => {
    return styleFromOrderStatus(status)
  }, [status])

  return (
    <Box className={cx(classes.badge)} style={style}>
      {status}
    </Box>
  )
}
