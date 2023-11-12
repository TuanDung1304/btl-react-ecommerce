import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './filterSlice'
import userSlice from './useSlice'

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    user: userSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
