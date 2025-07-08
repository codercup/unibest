import { http } from '@/http/http'

export interface IFoo {
  id: number
  name: string
}

export function foo() {
  return http.Get<IFoo>('/foo', {
    params: {
      name: '菲鸽',
      page: 1,
      pageSize: 10,
    },
  })
}
