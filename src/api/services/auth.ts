import axiosApiInstance from '..'
import { RegisterForm } from '../../Pages/Auth/validation'
import { RegisterData } from './types'

export const AuthService = {
  async signup(data: RegisterForm) {
    const res = await axiosApiInstance.post<RegisterData>('/auth/signup', data)
    return res.data
  },
}
