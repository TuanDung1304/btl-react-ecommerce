import {
  VoucherStatus,
  labelFromVoucherStatus,
  styleFromVoucherStatus,
} from './functions'
import { StatusBadge } from '../../../components/ui/StatusBadge'

interface Props {
  status: VoucherStatus
}

export default function VoucherStatusBadge({ status }: Props) {
  return (
    <StatusBadge
      status={status}
      labelFromStatus={labelFromVoucherStatus}
      styleFromStatus={styleFromVoucherStatus}
    />
  )
}
