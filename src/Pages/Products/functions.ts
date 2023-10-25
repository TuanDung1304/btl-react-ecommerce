import { useDispatch, useSelector } from 'react-redux'
import {
  AO_CATEGORIES,
  CategoryType,
  Category,
  PHU_KIEN_CATEGORIES,
  QUAN_CATEGORIES,
} from '../../components/Categories/categories'
import { RootState } from '../../store'
import { useCallback } from 'react'
import { Filter, setFilter } from '../../store/filterSlice'

export function getCategoryTypeFromUrl(url: string): CategoryType {
  if (AO_CATEGORIES.map((item) => item.url).includes(url)) {
    return CategoryType.Ao
  } else if (QUAN_CATEGORIES.map((item) => item.url).includes(url)) {
    return CategoryType.Quan
  }
  return CategoryType.PhuKien
}

export function getCategoriesFromType(type: CategoryType) {
  switch (type) {
    case CategoryType.Ao:
      return AO_CATEGORIES
    case CategoryType.Quan:
      return QUAN_CATEGORIES
    default:
      return PHU_KIEN_CATEGORIES
  }
}

export function getCategory(url: Category['url']): Category {
  const category = [
    ...AO_CATEGORIES,
    ...QUAN_CATEGORIES,
    ...PHU_KIEN_CATEGORIES,
  ].find((item) => item.url === url) as Category

  return category
}

export const useProductFilter = () => {
  const filter = useSelector((state: RootState) => state.filter)
  const dispatch = useDispatch()

  const setProductFilter = useCallback(
    (action: Partial<Filter>) => {
      dispatch(setFilter(action))
    },
    [dispatch],
  )

  return { filter, setProductFilter }
}
