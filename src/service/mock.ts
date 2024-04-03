import { http } from '@/utils/http'

export const getMockAPI = () => {
  return http.Get<number[]>(`/mock/todo`)
}
