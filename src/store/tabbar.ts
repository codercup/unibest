import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTabbarStore = defineStore(
  'tabbar',
  () => {
    interface tabBarItem {
      iconPath: string
      selectedIconPath: string
      pagePath: string
      text: string
    }
    const tabBarList = ref<tabBarItem[]>([
      {
        iconPath: '/static/tabbar/home.png',
        selectedIconPath: '/static/tabbar/homeHL.png',
        pagePath: '/pages/index/index',
        text: '首页',
      },
      {
        iconPath: '/static/tabbar/example.png',
        selectedIconPath: '/static/tabbar/exampleHL.png',
        pagePath: '/pages/index/about',
        text: '关于',
      },
    ])
    const tabIndex = ref(0)

    const setTabIndex = (val: number) => {
      tabIndex.value = val
    }

    return {
      tabBarList,
      tabIndex,
      setTabIndex,
    }
  },
  {
    persist: true,
  },
)
