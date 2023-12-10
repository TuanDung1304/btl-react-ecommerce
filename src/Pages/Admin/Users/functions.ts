import { colors } from '@mui/material'
import { CSSProperties } from 'react'
import { Role } from '../../../api/services/types'

export function styleFromRole(status: Role): CSSProperties {
  switch (status) {
    case Role.User:
      return {
        backgroundColor: colors.yellow[50],
        borderColor: colors.yellow[800],
        color: colors.orange[800],
      }
    case Role.Admin:
      return {
        backgroundColor: colors.red[50],
        borderColor: colors.red[200],
        color: colors.red[700],
      }
    default:
      return {}
  }
}
