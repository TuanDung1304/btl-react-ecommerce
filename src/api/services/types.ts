import { Product } from '../../Pages/Products/type'

export interface RegisterData {
  message: string
  user: {
    email: string
    id: number
  }
}

export enum Role {
  Admin = 'Admin',
  User = 'User',
}

export interface LoginData {
  message: string
  user: {
    email: string
    id: number
    firstName: string
    lastName: string
    avatar: string
    role: Role
  }
  tokens: {
    refreshToken: string
    accessToken: string
  }
}

export type RefreshTokensData = {
  message: string
  accessToken: string
}

export interface CreateProductData {
  message: string
  id: number
}

export interface ProductsData {
  products: Product[]
  totalPage: number
}

export interface ListUsersData {
  id: number
  email: string
  firstName: string
  lastName: string
  phone: string
  address: string
  avatar: string
  birthday: Date
  role: Role
  createdAt: Date
}

export interface ListProductsData {
  id: number
  name: string
  categoryId: string
  price: number
  thumbnail: string
  discountedPrice: number
  createdAt: Date
  inStock: number
  modelsCount: number
}

export interface AddCartData {
  cartItem: {
    id: number
    quantity: number
  }
  message: string
}

export interface CartItemData {
  cartItems: {
    id: number
    quantity: number
    productModel: {
      id: number
      quantity: number
      color: string
      size: string
      product: {
        id: number
        name: string
        price: number
        thumbnail: string
        discountedPrice: number
      }
    }
  }[]
}
