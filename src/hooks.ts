import { useCallback, useEffect } from 'react'
import { client as filestack } from 'filestack-react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'
import { User, setUser as setUserState } from './store/useSlice'

export const useDocumentTitle = (title: string) => {
  return useEffect(() => {
    document.title = title
  }, [title])
}

export const useFilestack = () => {
  const client = filestack.init('AdycHUcHuRhacN6VSzxRYz')
  return useCallback((props?: filestack.PickerOptions) => {
    return client.picker({
      ...props,
    })
  }, [])
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

  return { accessToken, setAccessToken, refreshToken, setRefreshToken }
}

export const useCurrentUser = () => {
  const dispatch = useDispatch<AppDispatch>()

  const setUser = (user: User) => {
    dispatch(setUserState(user))
  }
  const user = useSelector((state: RootState) => state.user)
  return { user, setUser }
}
