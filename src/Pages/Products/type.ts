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
}

export enum Sort {
  'default' = 'Sắp xếp',
  'newest' = 'Mới nhất',
  'asc' = 'Giá tăng dần',
  'desc' = 'Giá giảm dần',
}
