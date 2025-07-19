import { queryOptions } from '@tanstack/vue-query'
import { getFooAPI } from './foo'

export function getFooQueryOptions(name: string) {
  return queryOptions({
    queryFn: async ({ queryKey }) => {
      return getFooAPI(queryKey[1])
    },
    queryKey: ['getFoo', name],
  })
}
