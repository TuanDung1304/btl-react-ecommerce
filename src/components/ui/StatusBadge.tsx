import { Box } from '@mui/material'
import React, { useMemo } from 'react'
import { makeStyles } from 'tss-react/mui'
import { OrderStatus, Role } from '../../api/services/types'
import { VoucherStatus } from '../../Pages/Admin/Vouchers/functions'

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

interface Props<T extends OrderStatus | VoucherStatus | Role> {
  status: T
  styleFromStatus: (status: T) => React.CSSProperties
  labelFromStatus?: (status: T) => string
}

export const StatusBadge = <T extends OrderStatus | VoucherStatus | Role>({
  labelFromStatus,
  styleFromStatus,
  status,
}: Props<T>) => {
  const { classes, cx } = useStyles()
  const style = useMemo<React.CSSProperties>(() => {
    return styleFromStatus(status)
  }, [status, styleFromStatus])

  return (
    <Box className={cx(classes.badge)} style={style}>
      {labelFromStatus ? labelFromStatus(status) : status}
    </Box>
  )
}
