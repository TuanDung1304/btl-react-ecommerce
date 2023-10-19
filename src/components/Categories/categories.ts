export type Category = {
  name: string
  url: string
  type: CategoryType
}

export enum CategoryType {
  'Quan' = 'Quan',
  'Ao' = 'Ao',
  'PhuKien' = 'Phu Kien',
}

export const AO_CATEGORIES: Category[] = [
  { name: 'ALL', url: 'ao-nam', type: CategoryType.Quan },
  { name: 'AO POLO', url: 'ao-polo', type: CategoryType.Quan },
  { name: 'AO SO MI', url: 'ao-so-mi', type: CategoryType.Quan },
  { name: 'AO KHOAC', url: 'ao-khoac', type: CategoryType.Quan },
  { name: 'AO PHONG', url: 'ao-phong', type: CategoryType.Quan },
  { name: 'AO LEN', url: 'ao-len', type: CategoryType.Quan },
  { name: 'AO VEST', url: 'ao-vest', type: CategoryType.Quan },
]

export const QUAN_CATEGORIES: Category[] = [
  { name: 'ALL', url: 'quan-nam', type: CategoryType.Ao },
  { name: 'QUAN JEAN', url: 'quan-jean', type: CategoryType.Ao },
  { name: 'QUAN TAY', url: 'quan-tay', type: CategoryType.Ao },
  { name: 'QUAN KAKI', url: 'quan-kaki', type: CategoryType.Ao },
  { name: 'QUAN DUI', url: 'quan-gio', type: CategoryType.Ao },
]

export const PHU_KIEN_CATEGORIES: Category[] = [
  { name: 'ALL', url: 'phu-kien', type: CategoryType.PhuKien },
  { name: 'GIAY', url: 'giay', type: CategoryType.PhuKien },
  { name: 'DAY LUNG', url: 'day-lung', type: CategoryType.PhuKien },
  { name: 'VI', url: 'vi', type: CategoryType.PhuKien },
]
