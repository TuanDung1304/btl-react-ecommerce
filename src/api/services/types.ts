import { Product } from '../../Pages/Products/type'

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

export interface CreateProductData {
  message: string
  id: number
}

export interface ProductsData {
  products: Product[]
  totalPage: number
}
