import { colors } from '@mui/material'
import { CSSProperties } from 'react'

export enum VoucherStatus {
  Pending = 'Pending',
  Active = 'Active',
  Expired = 'Expired',
}

export function labelFromVoucherStatus(status: VoucherStatus) {
  switch (status) {
    case VoucherStatus.Pending:
      return 'Chưa bắt đầu'
    case VoucherStatus.Active:
      return 'Hiệu lực'
    case VoucherStatus.Expired:
      return 'Hết hạn'
    default:
      return ''
  }
}

export function styleFromVoucherStatus(status: VoucherStatus): CSSProperties {
  switch (status) {
    case VoucherStatus.Pending:
      return {
        backgroundColor: colors.yellow[50],
        borderColor: colors.yellow[800],
        color: colors.orange[800],
      }
    case VoucherStatus.Active:
      return {
        backgroundColor: colors.green[50],
        borderColor: colors.green[200],
        color: colors.green[700],
      }
    case VoucherStatus.Expired:
      return {
        backgroundColor: colors.red[50],
        borderColor: colors.red[500],
        color: colors.red[800],
      }
    default:
      return {}
  }
}
