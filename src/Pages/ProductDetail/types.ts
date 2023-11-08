import { CreateProductForm } from '../Admin/Product/types'

export interface ProductDetailData extends CreateProductForm {
  id: number
  discountedPrice?: number
}
