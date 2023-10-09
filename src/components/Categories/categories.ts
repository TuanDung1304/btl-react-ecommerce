type Categories = {
  name: string
  url?: string
}

export enum CategoriesOwn {
  'MEN' = 'MEN',
  'WOMEN' = 'WOMEN',
  'SPORTSWEAR' = 'SPORTSWEAR',
}

export const menCategories: Categories[] = [
  { name: 'SHIRTS', url: 'shirts' },
  { name: 'T-SHIRTS', url: 't-shirts' },
  { name: 'SWEATERS', url: 'sweaters' },
  { name: 'JACKETS AND COATS', url: 'jackets-and-coasts' },
]

export const womenCategories: Categories[] = [
  { name: 'SKIRTS', url: 'shirts' },
  { name: 'DRESSES', url: 't-shirts' },
  { name: 'SHIRTS AND BLOUSES', url: 'sweaters' },
  { name: 'SWEATER', url: 'jackets-and-coast' },
  { name: 'TOP AND T-SHIRTS', url: 'top-and-t-shirts' },
  { name: 'JACKETS AND COATS', url: 'jackets-and-coasts' },
]

export const sportSwearsCategories: Categories[] = [
  { name: 'TOPS', url: 'tops' },
  { name: 'SWEATSHIRTS', url: 'sweatshirts' },
  { name: 'PAINTS', url: 'paints' },
]
