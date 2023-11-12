import axiosApiInstance from '..'
import { User } from '../../store/useSlice'

export const UserService = {
  async getUserInfo() {
    const res = await axiosApiInstance.get<User>('users/profile')
    return res.data
  },
}
