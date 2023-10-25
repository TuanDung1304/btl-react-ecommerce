import { CategoryType } from '../../components/Categories/categories'

export type Product = {
  img: string
  price: number
  name: string
  model: string
  type: CategoryType
  category: string
  id: number
}

export enum Size {
  xs = 'MS',
  s = 'S',
  m = 'M',
  l = 'L',
  xl = 'XL',
}

export enum Sort {
  'default' = 'Short',
  'newest' = 'Newest',
  'asc' = 'Price (Low - High)',
  'desc' = 'Price (High - Low)',
}
