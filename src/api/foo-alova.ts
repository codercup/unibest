import { API_DOMAINS, http } from '@/http/alova'

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
    meta: { domain: API_DOMAINS.SECONDARY }, // 用于切换请求地址
  })
}
