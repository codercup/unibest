import { http, uniFileUpload } from '@/utils/http'
import type { IFooItem } from './foo.d'

export { IFooItem }

/** get 请求 */
export const getFooAPI = (name: string) => {
  return http<IFooItem>({
    url: `/foo`,
    method: 'GET',
    query: { name },
  })
}

/** get 请求 */
export const postFooAPI = (name: string) => {
  return http<IFooItem>({
    url: `/foo`,
    method: 'POST',
    query: { name }, // post 请求也支持 query
    data: { name },
  })
}

// 文件上传
export const fileUpload = (data: IUniUploadFileOptions) => {
  return uniFileUpload({
    url: `/foo/upload`,
    method: 'POST',
    ...data,
  })
}
