export type Categories = {
  name: string
  url: string
}

export enum CategoriesType {
  'Quan' = 'Quan',
  'Ao' = 'Ao',
  'PhuKien' = 'Phu Kien',
}

export const AO_CATEGORIES: Categories[] = [
  { name: 'AO POLO', url: 'ao-polo' },
  { name: 'AO SO MI', url: 'ao-so-mi' },
  { name: 'AO KHOAC', url: 'ao-khoac' },
  { name: 'AO PHONG', url: 'ao-phong' },
  { name: 'AO LEN', url: 'ao-len' },
  { name: 'AO VEST', url: 'ao-vest' },
]

export const QUAN_CATEGORIES: Categories[] = [
  { name: 'QUAN JEAN', url: 'quan-jean' },
  { name: 'QUAN TAY', url: 'quan-tay' },
  { name: 'QUAN KAKI', url: 'quan-kaki' },
  { name: 'QUAN DUI', url: 'quan-gio' },
]

export const PHU_KIEN_CATEGORIES: Categories[] = [
  { name: 'GIAY', url: 'giay' },
  { name: 'DAY LUNG', url: 'day-lung' },
  { name: 'VI', url: 'vi' },
]
