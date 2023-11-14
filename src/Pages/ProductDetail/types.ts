import { CreateProductForm } from '../Admin/Products/CreateProduct/types'

export interface ProductDetailData extends CreateProductForm {
  id: number
  discountedPrice?: number
}
