import axiosApiInstance from '..'
import { RegisterForm, LoginForm } from '../../Pages/Auth/validation'
import { LoginData, RefreshTokensData, RegisterData } from './types'

export const AuthService = {
  async signup(data: RegisterForm) {
    const res = await axiosApiInstance.post<RegisterData>('/auth/signup', data)
    return res.data
  },
  async login(data: LoginForm) {
    const res = await axiosApiInstance.post<LoginData>('/auth/login', data)
    return res.data
  },
  async refreshTokens() {
    const res = await axiosApiInstance.get<RefreshTokensData>('/auth/refresh')
    return res.data
  },
  async logout() {
    const res = await axiosApiInstance.get<{ message: string }>('/auth/logout')
    return res.data
  },
}
