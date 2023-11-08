import axiosApiInstance from '..'
import { Product } from '../../Pages/Products/type'
import { CreateProductForm } from '../../Pages/Admin/Product/types'
import { CreateProductData } from './types'

export const ProductService = {
  async getProducts(param: string) {
    const res = await axiosApiInstance.get<Product[]>(`/collections/${param}`)
    return res.data
  },
  async createProducts(data: CreateProductForm) {
    const res = await axiosApiInstance.post<CreateProductData>(
      `/products/create`,
      data,
    )
    return res.data
  },
}