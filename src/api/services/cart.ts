import axiosApiInstance from '..'
import { AddCartData, CartItemData } from './types'

export const CartService = {
  async getCart() {
    const res = await axiosApiInstance.get<CartItemData>('carts/get')
    return res.data
  },

  async addToCart(data: { modelId: number; quantity: number }) {
    const res = await axiosApiInstance.post<AddCartData>('/carts/add', data)
    return res.data
  },

  async adjustQuantity(data: { cartItemId: number; quantity: number }) {
    const res = await axiosApiInstance.post<{
      message: string
      quantity: number
    }>('/carts/update', data)
    return res.data
  },
}
