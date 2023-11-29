import { colors } from '@mui/material'
import { OrderStatus } from '../../../api/services/types'
import { CSSProperties } from 'react'

export function colorFromStatus(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Pending:
      return colors.yellow[800]
    case OrderStatus.Delivering:
      return colors.blue[600]
    case OrderStatus.Completed:
      return colors.green[600]
    case OrderStatus.Cancelled:
      return colors.grey[600]
    default:
      return ''
  }
}

export function labelFromOrderStatus(status: OrderStatus) {
  switch (status) {
    case OrderStatus.Pending:
      return 'Chờ xử lý'
    case OrderStatus.Delivering:
      return 'Đang giao'
    case OrderStatus.Completed:
      return 'Hoàn thành'
    case OrderStatus.Cancelled:
      return 'Đã hủy'
    default:
      return ''
  }
}

export function styleFromOrderStatus(status: OrderStatus): CSSProperties {
  switch (status) {
    case OrderStatus.Pending:
      return {
        backgroundColor: colors.yellow[50],
        borderColor: colors.yellow[800],
        color: colors.orange[800],
      }
    case OrderStatus.Delivering:
      return {
        backgroundColor: colors.blue[50],
        borderColor: colors.blue[200],
        color: colors.blue[700],
      }
    case OrderStatus.Completed:
      return {
        backgroundColor: colors.green[50],
        borderColor: colors.green[200],
        color: colors.green[700],
      }
    case OrderStatus.Cancelled:
      return {
        backgroundColor: colors.grey[50],
        borderColor: colors.grey[300],
        color: colors.grey[900],
      }
    default:
      return {}
  }
}
