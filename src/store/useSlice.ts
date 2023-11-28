import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserService } from '../api/services/user'
import { Role } from '../api/services/types'

export type Notification = {
  createdAt: Date
  product: {
    id: number
    name: string
    thumbnail: string
  }
  content: string
}

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: Role
  avatar: string
  cartQuantity: number
  notifications: Notification[]
  address: string
  phone: string
  birthday: string
}

const initialState: User = {
  id: 0,
  email: '',
  firstName: '',
  lastName: '',
  role: Role.User,
  avatar: '',
  cartQuantity: 0,
  notifications: [],
  address: '',
  birthday: '',
  phone: '',
}

export const getUser = createAsyncThunk<User>('users/profile', async () => {
  try {
    const res = await UserService.getUserInfo()
    return res
  } catch {
    return initialState
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(_, action: PayloadAction<User>) {
      return action.payload
    },
    removeUser() {
      return initialState
    },
  },
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      return { ...state, ...payload }
    })
  },
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer
