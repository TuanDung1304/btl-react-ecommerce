import { Size } from '../../Products/type'

export type CreateProductModel = {
  color: string
  size: Size
  quantity: number
}

export type CreateProductForm = {
  name: string
  price: number
  categoryId?: string
  description?: string
  images: {
    url: string
  }[]
  productModels: CreateProductModel[]
  thumbnail: string
}
