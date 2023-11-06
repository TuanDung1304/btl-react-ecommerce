import axiosApiInstance from '..'
import { Product } from '../../Pages/Products/type'

export const ProductService = {
  async getProducts(param: string) {
    const res = await axiosApiInstance.get<Product[]>(`/collections/${param}`)
    return res.data
  },
}
