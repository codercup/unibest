import { http } from '@/utils/http'

/** get 请求 */
export const getFooAPI = (name) => {
  return http({
    url: `/foo`,
    method: 'GET',
    query: { name },
  })
}

/** get 请求 */
export const postFooAPI = (name) => {
  return http({
    url: `/foo`,
    method: 'POST',
    query: { name }, // post 请求也支持 query
    data: { name },
  })
}
