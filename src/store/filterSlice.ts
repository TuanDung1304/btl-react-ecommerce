import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Size, Sort } from '../Pages/Products/type'

export interface Filter {
  color?: string
  category?: string
  size?: keyof typeof Size
  min: number
  max: number
  sortBy: keyof typeof Sort
  page: number
  perPage: number
}

const initialState: Filter = {
  max: 5000000,
  min: 0,
  sortBy: 'default',
  page: 1,
  perPage: 8,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Partial<Filter>>) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
