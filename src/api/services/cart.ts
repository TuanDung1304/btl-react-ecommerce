import axiosApiInstance from '..'
import { AddCartData } from './types'

export class CartService {
  async addToCart(data: { modelId: number; quantity: number }) {
    const res = await axiosApiInstance.post<AddCartData>('/carts/add', data)
    return res.data
  }
}
