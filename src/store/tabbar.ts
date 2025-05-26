import { defineStore } from 'pinia'

export interface TabbarItem {
  name: string
  value: number | null
  active: boolean
  route: string
  title: string
  icon: string
}

export const useTabbarStore = defineStore('tabbar', {
  state: (): { tabbarItems: TabbarItem[] } => ({
    tabbarItems: [
      {
        name: 'index',
        value: null,
        active: true,
        route: '/pages/index/index',
        title: '首页',
        icon: 'home',
      },
      {
        name: 'about',
        value: null,
        active: false,
        route: '/pages/about/about',
        title: '关于',
        icon: 'user',
      },
    ],
  }),
  getters: {
    getTabbarItems: (state) => {
      return state.tabbarItems
    },
    getActive: (state) => {
      const item = state.tabbarItems.find((item) => item.active)
      return item || state.tabbarItems[0]
    },
    getTabbarItemValue: (state) => {
      return (name: string) => {
        const item = state.tabbarItems.find((item) => item.name === name)
        return item && item.value ? item.value : null
      }
    },
    getTabbarItemRoute: (state) => {
      return (name: string) => {
        const item = state.tabbarItems.find((item) => item.name === name)
        return (item && item.route) ?? null
      }
    },
  },
  actions: {
    setTabbarItem(name: string, value: number) {
      const tabbarItem = this.tabbarItems.find((item) => item.name === name)
      if (tabbarItem) {
        tabbarItem.value = value
      }
    },
    setTabbarItemActive(name: string) {
      this.tabbarItems.forEach((item) => {
        if (item.name === name) {
          item.active = true
        } else {
          item.active = false
        }
      })
    },
  },
})
