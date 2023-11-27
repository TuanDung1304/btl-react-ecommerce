import axiosApiInstance from '..'
import { DashboardData } from './types'

export const AdminService = {
  async getDashboardData() {
    const res = await axiosApiInstance.get<DashboardData>('/admin/dashboard')
    return res.data
  },
}
