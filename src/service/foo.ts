import { http } from '@/utils/http'
import type { FooItem } from './foo.d'

export { FooItem }

/** get 请求 */
export const getFoo = (name: string) => {
  return http<FooItem>({
    url: `/foo`,
    method: 'GET',
    query: { name },
  })
}

/** get 请求 */
export const postFoo = (name: string) => {
  return http<FooItem>({
    url: `/foo`,
    method: 'POST',
    query: { name }, // post 请求也支持 query
    data: { name },
  })
}
