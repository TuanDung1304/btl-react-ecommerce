import { CategoryType } from '../../components/Categories/categories'

export type Product = {
  img: string
  price: number
  name: string
  model: string
  type: CategoryType
  category: string
}
