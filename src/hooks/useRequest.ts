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
  const isCancelled = ref(false)

  const run = async (args?: P): Promise<T | undefined> => {
    loading.value = true
    error.value = false
    isCancelled.value = false
    let promise: Promise<T | undefined>
    const result = func(args)

    if (result instanceof Promise) {
      promise = result.then((res) => {
        if (res && typeof (res as HttpRequestResult<T>).promise === 'object' && typeof (res as HttpRequestResult<T>).requestTask === 'object') {
          const { promise: p, requestTask: task } = res as HttpRequestResult<T>
          requestTask = task
          if (isCancelled.value) {
            task.abort()
            throw new Error('Request cancelled')
          }
          return p
        }
        if (isCancelled.value) {
          throw new Error('Request cancelled')
        }
        return res as T | undefined
      }) as Promise<T | undefined>
    }
    else if (result && typeof (result as HttpRequestResult<T>).promise === 'object' && typeof (result as HttpRequestResult<T>).requestTask === 'object') {
      const { promise: p, requestTask: task } = result as HttpRequestResult<T>
      requestTask = task
      promise = p
    }
    else {
      promise = Promise.resolve(result as T | undefined)
    }

    return promise
      .then((res) => {
        if (isCancelled.value) {
          return
        }
        data.value = res
        return data.value
      })
      .catch((err) => {
        if (!isCancelled.value) {
          error.value = err
          throw err
        }
        return Promise.resolve(undefined)
      })
      .finally(() => {
        loading.value = false
      })
  }

  const cancel = () => {
    isCancelled.value = true
    if (requestTask) {
      requestTask.abort()
    }
    loading.value = false
    error.value = new Error('Request cancelled')
  }

  if (options.immediate) {
    (run as (args?: P) => Promise<T | undefined>)({} as P)
  }
  return { loading, error, data, run, cancel }
}
