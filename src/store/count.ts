// src/store/use_count_store.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCountStore = defineStore(
  'count',
  () => {
    const count = ref(0)
    const increment = () => {
      count.value++
    }
    return {
      count,
      increment,
    }
  },
  {
    persist: true,
  },
)
