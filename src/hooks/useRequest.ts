import { UnwrapRef } from 'vue'

type IUseRequestOptions<T> = {
  /** 是否立即执行，如果是则在onLoad执行 */
  immediate?: boolean
  /** 是否保证立即执行，如果是则在钩子调用时立即执行 */
  ensureImmediate?: boolean
  /** 初始化数据 */
  initialData?: T
}

/**
 * useRequest是一个定制化的请求钩子，用于处理异步请求和响应。
 * @param func 一个执行异步请求的函数，返回一个包含响应数据的Promise。
 * @param options 包含请求选项的对象 {immediate, initialData}。
 * @param options.immediate 是否立即执行，如果是则在onLoad执行，默认为true。
 * @param options.ensureImmediate 是否保证立即执行，如果是则在钩子调用时立即执行，默认为false。
 * @param options.initialData 初始化数据，默认为undefined。
 * @returns 返回一个对象{loading, error, data, run}，包含请求的加载状态、错误信息、响应数据和手动触发请求的函数。
 * @example
 * 1. 默认在组件挂载后立即执行请求：
 *
 * const { loading, error, data, run } = useRequest(() => apiCall());
 *
 * 2. 钩子调用时立即执行执行请求：
 *
 * const { loading, error, data, run } = useRequest(() => apiCall(), { ensureImmediate: true });
 *
 * 3. 不在组件挂载后立即执行请求，需要手动触发：
 *
 * const { loading, error, data, run } = useRequest(() => apiCall(), { immediate: false });
 * onMounted(() => {
 *   run();
 * });
 *
 * 注意事项：
 * - `immediate` 参数控制请求是否在组件挂载后立即执行。适用于需要在组件挂载后立即执行请求的场景。
 * - `ensureImmediate` 参数强制请求在组件挂载后立即执行，不管 `immediate` 的值。这在需要无条件立即执行请求的场景中非常有用。
 * - 当同时设置 `immediate: false` 和 `ensureImmediate: true` 时，请求仍会立即执行。
 */
export default function useRequest<T>(
  func: () => Promise<IResData<T>>,
  options: IUseRequestOptions<T> = { immediate: true, ensureImmediate: false },
) {
  const loading = ref(false)
  const error = ref(false)
  const data = ref<T>(options.initialData)
  const run = async () => {
    loading.value = true
    return func()
      .then((res) => {
        data.value = res.data as UnwrapRef<T>
        error.value = false
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

  if (options.ensureImmediate) {
    // 钩子调用时立即执行执行请求
    run()
  } else if (options.immediate) {
    // 组件挂载后立即执行请求
    onLoad(() => run())
  }
  return { loading, error, data, run }
}
