import { Size } from '../../Products/type'

export type CreateProductModel = {
  color: string
  size: keyof typeof Size
  quantity: number
}
