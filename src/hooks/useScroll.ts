import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'

interface UseScrollOptions<T> {
  fetchData: (page: number, pageSize: number) => Promise<T[]>
  pageSize?: number
}

interface UseScrollReturn<T> {
  list: Ref<T[]>
  loading: Ref<boolean>
  finished: Ref<boolean>
  error: Ref<any>
  refresh: () => Promise<void>
  loadMore: () => Promise<void>
}

export function useScroll<T>({
  fetchData,
  pageSize = 10,
}: UseScrollOptions<T>): UseScrollReturn<T> {
  const list = ref<T[]>([]) as Ref<T[]>
  const loading = ref(false)
  const finished = ref(false)
  const error = ref<any>(null)
  const page = ref(1)

  const loadData = async () => {
    if (loading.value || finished.value)
      return

    loading.value = true
    error.value = null

    try {
      const data = await fetchData(page.value, pageSize)
      if (data.length < pageSize) {
        finished.value = true
      }
      list.value.push(...data)
      page.value++
    }
    catch (err) {
      error.value = err
    }
    finally {
      loading.value = false
    }
  }

  const refresh = async () => {
    page.value = 1
    finished.value = false
    list.value = []
    await loadData()
  }

  const loadMore = async () => {
    await loadData()
  }

  onMounted(() => {
    refresh()
  })

  return {
    list,
    loading,
    finished,
    error,
    refresh,
    loadMore,
  }
}
