import { useCallback, useEffect } from 'react'
import { client as filestack } from 'filestack-react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'
import {
  User,
  setUser as setUserState,
  removeUser as removeUserState,
} from './store/useSlice'

export const useDocumentTitle = (title: string) => {
  return useEffect(() => {
    document.title = title
  }, [title])
}

export const useFilestack = () => {
  const client = filestack.init('AdycHUcHuRhacN6VSzxRYz')
  return useCallback(
    (props?: filestack.PickerOptions) => {
      return client.picker({
        ...props,
      })
    },
    [client],
  )
}

export const useTokens = () => {
  const setAccessToken = (token: string) => {
    localStorage.setItem('access_token', token)
  }
  const accessToken = localStorage.getItem('access_token')
  const setRefreshToken = (token: string) => {
    localStorage.setItem('refresh_token', token)
  }
  const refreshToken = localStorage.getItem('refresh_token')

  const removeTokens = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  return {
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    removeTokens,
  }
}

export const useCurrentUser = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.user)

  const setUser = (user: Partial<User>) => {
    dispatch(setUserState(user))
  }

  const removeUser = () => {
    dispatch(removeUserState())
  }

  return { user, setUser, removeUser }
}
