import { VoucherStatus } from '../../Pages/Admin/Vouchers/functions'
import { Product } from '../../Pages/Products/type'
import { User } from '../../store/useSlice'

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
  user: User
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
  totalPrice: number
  totalItem: number
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

export interface CreateOrderData {
  message: string
  order: {
    id: number
    totalPrice: number
  }
}

export interface ChartData {
  total: number
  chartData: { day: string; value: number }[]
  percentage: number
  dataKey: ChartName
}

export enum ChartName {
  Products = 'products',
  Users = 'users',
  Orders = 'orders',
  Profit = 'profit',
}

export type TopDeal = Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'email' | 'avatar'
> & {
  total: number
}

export type DashboardData = Record<ChartName, ChartData> & {
  topDeals: TopDeal[]
}

export enum OrderStatus {
  Pending = 'Pending',
  Delivering = 'Delivering',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export interface Order {
  id: number
  status: OrderStatus
  address: string
  totalPrice: number
  createdAt: string
  cartItems: {
    quantity: number
  }[]
}

export interface AdminOrder {
  id: number
  totalModel: number
  totalProduct: number
  address: string
  createdAt: Date
  status: OrderStatus
  province: string
  district: string
  totalPrice: number
  userName: string
}

export type Notification = {
  createdAt: Date
  product: {
    id: number
    name: string
    thumbnail: string
  }
  content: string
}
export interface Notifications {
  notifications: Notification[]
  lastSeen: Date
}

export interface Voucher {
  id: number
  name: string
  code: string
  amount: number
  minOrderPrice: number
  maxUser: number
  used: number
  createdAt: Date
  startedAt: Date
  finishedAt: Date
  status: VoucherStatus
}
