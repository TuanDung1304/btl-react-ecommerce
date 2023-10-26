import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Size, Sort } from '../Pages/Products/type'

export interface Filter {
  color?: string
  category?: string
  size?: keyof typeof Size
  min: number
  max: number
  sortBy: keyof typeof Sort
}

const initialState: Filter = {
  max: 5000000,
  min: 0,
  sortBy: 'default',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(_state, action: PayloadAction<Partial<Filter>>) {
      return {
        ..._state,
        ...action.payload,
      }
    },
  },
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
