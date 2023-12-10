import axiosApiInstance from '..'
import { Voucher } from './types'

export const VoucherService = {
  async getVoucher(code: string) {
    const res = await axiosApiInstance.get<Voucher>(`/vouchers/${code}`)
    return res.data
  },
}
