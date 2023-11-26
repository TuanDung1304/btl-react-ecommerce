import axiosApiInstance from '..'
import { CheckoutForm } from '../../Pages/Checkout/validation'
import { CreateOrderData } from './types'

export const OrderService = {
  async createOrder(data: CheckoutForm) {
    const res = await axiosApiInstance.post<CreateOrderData>(
      '/orders/create',
      data,
    )
    return res.data
  },
}
