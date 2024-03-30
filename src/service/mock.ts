import { http } from '@/utils/http'
import type { IFooItem } from './foo.d'

export { IFooItem }

/** get 请求 */
export const getMockAPI = (name: string) => {
  return http<IFooItem>({
    url: `/api/get`,
    method: 'GET',
    query: { name },
  })
}
