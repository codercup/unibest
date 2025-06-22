// alovaJS 还在整理中，有比较熟悉的开发者可以PR一下，省得我去摸索
import { http } from '@/utils/request/alova'

export function foo() {
  return http.Get('/foo', {
    params: {
      name: '菲鸽',
      page: 1,
      pageSize: 10,
    },
  })
}
