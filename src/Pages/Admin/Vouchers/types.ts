import { Voucher } from '../../../api/services/types'

export type VoucherForm = Pick<
  Voucher,
  'name' | 'code' | 'amount' | 'maxUser' | 'startedAt' | 'finishedAt'
>
