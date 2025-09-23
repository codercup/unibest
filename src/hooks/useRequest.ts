import type { Ref } from 'vue'
import type { HttpRequestResult } from '@/http/types'
import { ref } from 'vue'

interface IUseRequestOptions<T> {
  /** 是否立即执行 */
  immediate?: boolean
  /** 初始化数据 */
  initialData?: T
}

interface IUseRequestReturn<T, P = undefined> {
  loading: Ref<boolean>
  error: Ref<boolean | Error>
  data: Ref<T | undefined>
  run: (args?: P) => Promise<T | undefined>
  cancel: () => void
}

/**
 * useRequest是一个定制化的请求钩子，用于处理异步请求和响应。
 * @param func 一个执行异步请求的函数，返回一个包含响应数据的Promise。
 * @param options 包含请求选项的对象 {immediate, initialData}。
 * @param options.immediate 是否立即执行请求，默认为false。
 * @param options.initialData 初始化数据，默认为undefined。
 * @returns 返回一个对象{loading, error, data, run}，包含请求的加载状态、错误信息、响应数据和手动触发请求的函数。
 */
export default function useRequest<T, P = undefined>(
  func: (args?: P) => Promise<T> | Promise<HttpRequestResult<T>> | HttpRequestResult<T> | T,
  options: IUseRequestOptions<T> = { immediate: false },
): IUseRequestReturn<T, P> {
  const loading = ref(false)
  const error = ref<boolean | Error>(false)
  const data = ref<T | undefined>(options.initialData) as Ref<T | undefined>
  let requestTask: UniApp.RequestTask | undefined

  const run = async (args?: P) => {
    loading.value = true
    error.value = false // Move error reset to the beginning
    let promise: Promise<T | undefined>
    const result = func(args)

    if (result instanceof Promise) {
      // If func returns a Promise
      promise = result.then((res) => {
        if (res && typeof (res as HttpRequestResult<T>).promise === 'object' && typeof (res as HttpRequestResult<T>).requestTask === 'object') {
          // If the resolved value is HttpRequestResult
          const { promise: p, requestTask: task } = res as HttpRequestResult<T>
          requestTask = task
          return p
        }
        return res as T | undefined
      }) as Promise<T | undefined> // Cast to ensure correct type
    }
    else if (result && typeof (result as HttpRequestResult<T>).promise === 'object' && typeof (result as HttpRequestResult<T>).requestTask === 'object') {
      // If func returns HttpRequestResult directly
      const { promise: p, requestTask: task } = result as HttpRequestResult<T>
      requestTask = task
      promise = p
    }
    else {
      // If func returns T directly
      promise = Promise.resolve(result as T | undefined)
    }

    return promise
      .then((res) => {
        data.value = res
        return data.value
      })
      .catch((err) => {
        error.value = err
        throw err
      })
      .finally(() => {
        loading.value = false
      })
  }

  const cancel = () => {
    if (requestTask) {
      requestTask.abort()
      loading.value = false // Reset loading state on cancel
      error.value = new Error('Request cancelled') // Set a specific error for cancellation
    }
  }

  if (options.immediate) {
    (run as (args?: P) => Promise<T | undefined>)({} as P)
  }
  return { loading, error, data, run, cancel }
}
