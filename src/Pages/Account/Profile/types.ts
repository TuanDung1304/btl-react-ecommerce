import { User } from '../../../store/useSlice'

export type UpdateProfile = Pick<User, 'email' | 'firstName' | 'lastName'> &
  Partial<Pick<User, 'birthday' | 'phone' | 'avatar' | 'address'>>
