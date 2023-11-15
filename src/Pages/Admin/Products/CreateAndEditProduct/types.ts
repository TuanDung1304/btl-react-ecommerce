import { Size } from '../../../Products/type'

export type ProductModel = {
  color: string
  size: Size
  quantity: number
}

export type Image = {
  id?: number
  url: string
}

export type ProductForm = {
  name: string
  price: number
  discountedPrice?: number
  categoryId?: string
  description?: string
  images: Image[]
  productModels: ProductModel[]
  thumbnail: string
}
