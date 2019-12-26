import useSWR, { ConfigInterface, responseInterface } from 'swr'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import Auth from '@root/tools/auth/auth'

export type GetRequest = AxiosRequestConfig | null

interface IReturn<Data, Error>
  extends Pick<responseInterface<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'revalidate' | 'error'> {
  data: Data | undefined
  response: AxiosResponse<Data> | undefined
}

export interface IConfig<Data = unknown, Error = unknown>
  extends Omit<ConfigInterface<AxiosResponse<Data>, AxiosError<Error>>,
    'initialData'> {
  initialData?: Data
}

export const httpRequest = axios.create({
  timeout: 10 * 1000,
  baseURL: 'http://localhost:8089/api',
})

httpRequest.interceptors.request.use((config) => {
  const token = Auth.getToken()
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function useRequest<Data = unknown, Error = unknown>(
  request: GetRequest,
  {initialData, ...config}: IConfig<Data, Error> = {}
): IReturn<Data, Error> {
  const {data: response, error, isValidating, revalidate} = useSWR<AxiosResponse<Data>,
    AxiosError<Error>>(request && JSON.stringify(request), () => httpRequest(request || {}), {
    ...config,
    initialData: initialData && {
      status: 200,
      statusText: 'InitialData',
      config: request,
      headers: {},
      data: initialData,
    },
  })

  if (error?.response?.status === 401) {
    Auth.clearToken()
    window.location.reload()
  }

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    revalidate,
  }
}
