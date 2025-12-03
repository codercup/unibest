import type { CustomTabBarItem, CustomTabBarItemBadge } from './types'
import { reactive } from 'vue'

import { tabbarList as _tabbarList, customTabbarEnable, selectedTabbarStrategy, TABBAR_STRATEGY_MAP } from './config'

// TODO 1/2: 中间的鼓包tabbarItem的开关
const BULGE_ENABLE = false

/** tabbarList 里面的 path 从 pages.config.ts 得到 */
const tabbarList = reactive<CustomTabBarItem[]>(_tabbarList.map(item => ({
  ...item,
  pagePath: item.pagePath.startsWith('/') ? item.pagePath : `/${item.pagePath}`,
})))

if (customTabbarEnable && BULGE_ENABLE) {
  if (tabbarList.length % 2) {
    console.error('有鼓包时 tabbar 数量必须是偶数，否则样式很奇怪！！')
  }
  tabbarList.splice(tabbarList.length / 2, 0, {
    isBulge: true,
  } as CustomTabBarItem)
}

export function isPageTabbar(path: string) {
  if (selectedTabbarStrategy === TABBAR_STRATEGY_MAP.NO_TABBAR) {
    return false
  }
  const _path = path.split('?')[0]
  return tabbarList.some(item => item.pagePath === _path)
}

/**
 * 自定义 tabbar 的状态管理，原生 tabbar 无需关注本文件
 * tabbar 状态，增加 storageSync 保证刷新浏览器时在正确的 tabbar 页面
 * 使用reactive简单状态，而不是 pinia 全局状态
 */
const tabbarStore = reactive({
  curIdx: uni.getStorageSync('app-tabbar-index') || 0,
  prevIdx: uni.getStorageSync('app-tabbar-index') || 0,
  setCurIdx(idx: number) {
    this.curIdx = idx
    uni.setStorageSync('app-tabbar-index', idx)
  },
  setTabbarItemBadge(idx: number, badge: CustomTabBarItemBadge) {
    if (tabbarList[idx]) {
      tabbarList[idx].badge = badge
    }
  },
  setAutoCurIdx(path: string) {
    // '/' 当做首页
    if (path === '/') {
      this.setCurIdx(0)
      return
    }
    const index = tabbarList.findIndex(item => item.pagePath === path)
    // console.log('tabbarList:', tabbarList)
    if (index === -1) {
      const pagesPathList = getCurrentPages().map(item => item.route.startsWith('/') ? item.route : `/${item.route}`)
      // console.log(pagesPathList)
      const flag = tabbarList.some(item => pagesPathList.includes(item.pagePath))
      if (!flag) {
        this.setCurIdx(0)
        return
      }
    }
    else {
      this.setCurIdx(index)
    }
  },
  restorePrevIdx() {
    if (this.prevIdx === this.curIdx)
      return
    this.setCurIdx(this.prevIdx)
    this.prevIdx = uni.getStorageSync('app-tabbar-index') || 0
  },
})

export { tabbarList, tabbarStore }
