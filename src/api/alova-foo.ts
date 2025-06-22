import { http } from '@/utils/request/alova'

export interface IFooItem {
  id: string
  name: string
}

export function foo() {
  return http.Get<IFooItem>('/foo', {
    params: {
      name: '菲鸽',
      page: 1,
      pageSize: 10,
    },
  })
}
