import axiosApiInstance from '..'
import { AdminOrder, DashboardData, OrderStatus, Voucher } from './types'
import { VoucherForm } from '../../Pages/Admin/Vouchers/types'

export const AdminService = {
  async getDashboardData() {
    const res = await axiosApiInstance.get<DashboardData>('/admin/dashboard')
    return res.data
  },
  async getOrders() {
    const res = await axiosApiInstance.get<AdminOrder[]>('/orders/admin-orders')
    return res.data
  },
  async updateOrderStatus(data: { orderId: number; status: OrderStatus }) {
    const res = await axiosApiInstance.post<{ message: string }>(
      '/orders/update-status',
      data,
    )
    return res.data
  },
  async createVoucher(data: VoucherForm) {
    const res = await axiosApiInstance.post<{ message: string }>(
      '/admin/create-voucher',
      data,
    )
    return res.data
  },
  async getVouchers() {
    const res = await axiosApiInstance.get<Voucher[]>('/admin/vouchers')
    return res.data
  },
  async editVouchers(data: VoucherForm) {
    const res = await axiosApiInstance.post<{ message: string }>(
      '/admin/edit-voucher',
      data,
    )
    return res.data
  },
  async deleteVoucher(data: { id: number }) {
    const res = await axiosApiInstance.post<{ message: string }>(
      '/admin/delete-voucher',
      data,
    )
    return res.data
  },
}
