export interface RegisterData {
  message: string
  user: {
    email: string
    id: number
  }
}
export interface LoginData {
  message: string
  user: {
    email: string
    id: string
    firstName: string
    avatar: string
    role: number
  }
  tokens: {
    refreshToken: string
    accessToken: string
  }
}
