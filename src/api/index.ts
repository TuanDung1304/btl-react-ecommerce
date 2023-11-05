import axios, {
  AxiosError,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios'
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

const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const newConfig = { ...config }

  return newConfig
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

const onResponse = (response: AxiosResponse) => {
  return response
}

const onResponseError = (error: AxiosError) => {
  return Promise.reject(error)
}

axiosApiInstance.interceptors.request.use(onRequest, onRequestError)
axiosApiInstance.interceptors.response.use(onResponse, onResponseError)

export default axiosApiInstance