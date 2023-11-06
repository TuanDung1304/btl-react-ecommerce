import axiosApiInstance from '..'
import { RegisterForm, LoginForm } from '../../Pages/Auth/validation'
import { LoginData, RegisterData } from './types'

export const AuthService = {
  async signup(data: RegisterForm) {
    const res = await axiosApiInstance.post<RegisterData>('/auth/signup', data)
    return res.data
  },
  async login(data: LoginForm) {
    const res = await axiosApiInstance.post<LoginData>('/auth/login', data)
    return res.data
  },
}
