import axiosApiInstance from '..'
import { AdminOrder, DashboardData, OrderStatus } from './types'

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
}
