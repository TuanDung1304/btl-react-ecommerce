import axiosApiInstance from '..'
import { User } from '../../store/useSlice'
import { ListUsersData } from './types'
import { UpdateProfile } from '../../Pages/Account/Profile/types'

export const UserService = {
  async getUserInfo() {
    const res = await axiosApiInstance.get<User>('users/profile')
    return res.data
  },
  async getListUsers() {
    const res = await axiosApiInstance.get<ListUsersData[]>('users/listUsers')
    return res.data
  },
  async lastSeen() {
    const res = await axiosApiInstance.post<{ lastSeen: Date }>(
      '/users/userSeen',
    )
    return res.data
  },
  async updateUser(data: UpdateProfile) {
    const res = await axiosApiInstance.post<{ message: string }>(
      '/users/update-profile',
      data,
    )
    return res.data
  },
}
