import type { CustomRequestOptions } from '@/http/types'
import { http } from './http'

/*
 * openapi-ts-request 工具的 request 跨客户端适配方法
 */
export default function request<T = unknown>(
  url: string,
  options: Omit<CustomRequestOptions, 'url'> & {
    params?: Record<string, unknown>
    headers?: Record<string, unknown>
  },
) {
  const requestOptions = {
    url,
    ...options,
  }

  if (options.params) {
    requestOptions.query = requestOptions.params
    delete requestOptions.params
  }

  if (options.headers) {
    requestOptions.header = options.headers
    delete requestOptions.headers
  }

  return http<T>(requestOptions)
}
