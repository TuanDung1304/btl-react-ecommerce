import axiosApiInstance from '..'
import { AdminOrder, DashboardData, OrderStatus } from './types'
import { CreateVoucherForm } from '../../Pages/Admin/Vouchers/types'

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
  async createVoucher(data: CreateVoucherForm) {
    const res = await axiosApiInstance.post<{ message: string }>(
      '/admin/create-voucher',
      data,
    )
    return res.data
  },
  async getVouchers() {
    const res = await axiosApiInstance.get('/admin/vouchers')
    return res.data
  },
}
