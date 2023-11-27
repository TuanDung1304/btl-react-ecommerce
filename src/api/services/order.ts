import axiosApiInstance from '..'
import { CheckoutForm } from '../../Pages/Checkout/validation'
import { CreateOrderData, MyOrder } from './types'

export const OrderService = {
  async createOrder(data: CheckoutForm) {
    const res = await axiosApiInstance.post<CreateOrderData>(
      '/orders/create',
      data,
    )
    return res.data
  },
  async myOrders() {
    const res = await axiosApiInstance.get<MyOrder[]>('/orders/my-orders')
    return res.data
  },
}
