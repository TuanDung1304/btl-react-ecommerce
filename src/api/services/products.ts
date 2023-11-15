import axiosApiInstance from '..'
import { CreateProductData, ListProductsData, ProductsData } from './types'
import { ProductDetailData } from '../../Pages/ProductDetail/types'
import { Filter } from '../../store/filterSlice'
import { ProductForm } from '../../Pages/Admin/Products/CreateAndEditProduct/types'

export const ProductService = {
  async getProducts(param: string, filter: Filter) {
    const res = await axiosApiInstance.post<ProductsData>(
      `/collections/${param}`,
      filter,
    )
    return res.data
  },
  async getProductsList() {
    const res = await axiosApiInstance.get<ListProductsData[]>(
      '/products/listProducts',
    )
    return res.data
  },
  async getProductDetail(id: number) {
    const res = await axiosApiInstance.get<ProductDetailData>(`products/${id}`)
    return res.data
  },
  async createProduct(data: ProductForm) {
    const res = await axiosApiInstance.post<CreateProductData>(
      `/products/create`,
      data,
    )
    return res.data
  },
  async updateProduct(data: ProductForm, id: number) {
    const res = await axiosApiInstance.post<CreateProductData>(
      `/products/edit/${id}`,
      data,
    )
    return res.data
  },
}
