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

export interface IFooItem {
  id: string
  name: string
}

/** GET 请求 */
export function getFooAPI(name: string) {
  return http.get<IFooItem>('/foo', { name })
}
/** GET 请求；支持 传递 header 的范例 */
export function getFooAPI2(name: string) {
  return http.get<IFooItem>('/foo', { name }, { 'Content-Type-100': '100' })
}

/** POST 请求 */
export function postFooAPI(name: string) {
  return http.post<IFooItem>('/foo', { name })
}
/** POST 请求；需要传递 query 参数的范例；微信小程序经常有同时需要query参数和body参数的场景 */
export function postFooAPI2(name: string) {
  return http.post<IFooItem>('/foo', { name })
}
/** POST 请求；支持 传递 header 的范例 */
export function postFooAPI3(name: string) {
  return http.post<IFooItem>('/foo', { name }, { name }, { 'Content-Type-100': '100' })
}
