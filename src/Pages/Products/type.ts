export type Product = {
  id: number
  name: string
  thumbnail: string
  price: number
  categoryId: string
  discountedPrice?: number
  description?: string
}

export enum Size {
  xs = 'XS',
  s = 'S',
  m = 'M',
  l = 'L',
  xl = 'XL',
  xxl = 'XXL',
}

export enum Sort {
  'default' = 'Short',
  'newest' = 'Newest',
  'asc' = 'Price (Low - High)',
  'desc' = 'Price (High - Low)',
}
