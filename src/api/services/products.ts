import axiosApiInstance from '..'
import { CreateProductForm } from '../../Pages/Admin/Product/types'
import { CreateProductData, ProductsData } from './types'
import { ProductDetailData } from '../../Pages/ProductDetail/types'
import { Filter } from '../../store/filterSlice'

export const ProductService = {
  async getProducts(param: string, filter: Filter) {
    const res = await axiosApiInstance.post<ProductsData>(
      `/collections/${param}`,
      filter,
    )
    return res.data
  },
  async getProductDetail(id: number) {
    const res = await axiosApiInstance.get<ProductDetailData>(`products/${id}`)
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
