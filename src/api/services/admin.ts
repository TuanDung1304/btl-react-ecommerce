import axiosApiInstance from '..'
import { AdminOrder, DashboardData } from './types'

export const AdminService = {
  async getDashboardData() {
    const res = await axiosApiInstance.get<DashboardData>('/admin/dashboard')
    return res.data
  },
  async getOrders() {
    const res = await axiosApiInstance.get<AdminOrder[]>('orders/admin-orders')
    return res.data
  },
}
