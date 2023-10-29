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
  { name: 'ALL', url: 'ao-nam', type: CategoryType.Quan },
  { name: 'ÁO POLO', url: 'ao-polo', type: CategoryType.Quan },
  { name: 'Áo SƠ MI', url: 'ao-so-mi', type: CategoryType.Quan },
  { name: 'Áo KHOÁC', url: 'ao-khoac', type: CategoryType.Quan },
  { name: 'Áo PHÔNG', url: 'ao-phong', type: CategoryType.Quan },
  { name: 'Áo LEN', url: 'ao-len', type: CategoryType.Quan },
  { name: 'Áo VEST', url: 'ao-vest', type: CategoryType.Quan },
]

export const QUAN_CATEGORIES: Category[] = [
  { name: 'ALL', url: 'quan-nam', type: CategoryType.Ao },
  { name: 'QUẦN JEAN', url: 'quan-jean', type: CategoryType.Ao },
  { name: 'QUẦN TÂY', url: 'quan-tay', type: CategoryType.Ao },
  { name: 'QUẦN KAKI', url: 'quan-kaki', type: CategoryType.Ao },
  { name: 'QUẦN ĐÙI', url: 'quan-gio', type: CategoryType.Ao },
]

export const PHU_KIEN_CATEGORIES: Category[] = [
  { name: 'ALL', url: 'phu-kien', type: CategoryType.PhuKien },
  { name: 'GIẦY', url: 'giay', type: CategoryType.PhuKien },
  { name: 'DÂY LƯNG', url: 'day-lung', type: CategoryType.PhuKien },
  { name: 'VÍ', url: 'vi', type: CategoryType.PhuKien },
]
