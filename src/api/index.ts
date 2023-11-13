import axios, {
  AxiosError,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios'
import { AuthService } from './services/auth'
const BASE_URL = 'http://localhost:3333'

const axiosConfig: CreateAxiosDefaults = {
  headers: {
    Accept: 'application/json',
  },
}

const axiosApiInstance = axios.create({
  ...axiosConfig,
  baseURL: BASE_URL,
})

let isRefreshToken = false

const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const newConfig = { ...config }
  const token = isRefreshToken
    ? localStorage.getItem('refresh_token')
    : localStorage.getItem('access_token')

  newConfig.headers.Authorization = `Bearer ${token}`

  return newConfig
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

const onResponse = (response: AxiosResponse) => {
  return response
}

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  const { response, config } = error
  if (response?.status === 401 && !isRefreshToken) {
    isRefreshToken = true

    try {
      const res = await AuthService.refreshTokens()
      if (res.accessToken && config) {
        localStorage.setItem('access_token', res.accessToken)
        return axiosApiInstance(config)
      }
    } catch (error) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    } finally {
      isRefreshToken = false
    }
  }

  return Promise.reject(error)
}

axiosApiInstance.interceptors.request.use(onRequest, onRequestError)
axiosApiInstance.interceptors.response.use(onResponse, onResponseError)

export default axiosApiInstance
