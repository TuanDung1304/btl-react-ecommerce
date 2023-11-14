import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserService } from '../api/services/user'
import { Role } from '../api/services/types'

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: Role
  avatar: string
}

const initialState: User = {
  id: 0,
  email: '',
  firstName: '',
  lastName: '',
  role: Role.User,
  avatar: '',
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
      state.email = payload.email
      state.id = payload.id
      state.avatar = payload.avatar
      state.firstName = payload.firstName
      state.lastName = payload.lastName
      state.role = payload.role
    })
  },
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer
