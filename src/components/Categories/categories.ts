export type Category = {
  name: string
  url: string
  type: CategoryType
}

export enum CategoryType {
  'Quan' = 'Quần',
  'Ao' = 'Áo',
  'PhuKien' = 'Phụ Kiện',
}

export const AO_CATEGORIES: Category[] = [
  { name: 'ALL', url: 'ao-nam', type: CategoryType.Ao },
  { name: 'ÁO POLO', url: 'ao-polo', type: CategoryType.Ao },
  { name: 'ÁO SƠ MI', url: 'ao-so-mi', type: CategoryType.Ao },
  { name: 'ÁO KHOÁC', url: 'ao-khoac', type: CategoryType.Ao },
  { name: 'ÁO PHÔNG', url: 'ao-phong', type: CategoryType.Ao },
  { name: 'ÁO LEN', url: 'ao-len', type: CategoryType.Ao },
  { name: 'ÁO VEST', url: 'ao-vest', type: CategoryType.Ao },
]

export const QUAN_CATEGORIES: Category[] = [
  { name: 'ALL', url: 'quan-nam', type: CategoryType.Quan },
  { name: 'QUẦN JEAN', url: 'quan-jean', type: CategoryType.Quan },
  { name: 'QUẦN TÂY', url: 'quan-tay', type: CategoryType.Quan },
  { name: 'QUẦN KAKI', url: 'quan-kaki', type: CategoryType.Quan },
  { name: 'QUẦN ĐÙI', url: 'quan-gio', type: CategoryType.Quan },
]

export const PHU_KIEN_CATEGORIES: Category[] = [
  { name: 'ALL', url: 'phu-kien', type: CategoryType.PhuKien },
  { name: 'GIẦY', url: 'giay', type: CategoryType.PhuKien },
  { name: 'DÂY LƯNG', url: 'day-lung', type: CategoryType.PhuKien },
  { name: 'VÍ', url: 'vi', type: CategoryType.PhuKien },
]

export const CATEGORIES = [
  ...AO_CATEGORIES,
  ...QUAN_CATEGORIES,
  ...PHU_KIEN_CATEGORIES,
].filter((item) => item.name !== 'ALL')
