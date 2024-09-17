import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = { name: '首页', activeIndex: 0 }

export const useTabbarStore = defineStore(
  'tabbar',
  () => {
    const tabbarInfo = ref<TabbarInfo>({ ...initState })

    const setTabbarInfo = (val: TabbarInfo) => {
      tabbarInfo.value = val
    }

    const clearTabbarInfo = () => {
      tabbarInfo.value = { ...initState }
    }
    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      tabbarInfo.value = { ...initState }
    }

    return {
      tabbarInfo,
      setTabbarInfo,
      clearTabbarInfo,
      reset,
    }
  },
  {
    persist: false,
  },
)
