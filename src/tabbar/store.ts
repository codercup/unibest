import type { CustomTabBarItem } from './config'
import { tabbarList as _tabbarList } from './config'

// TODO 1/2: 中间的鼓包tabbarItem的开关
const BULGE_ENABLE = true

/** tabbarList 里面的 path 从 pages.config.ts 得到 */
const tabbarList: CustomTabBarItem[] = _tabbarList.map(item => ({ ...item, pagePath: item.pagePath.startsWith('/') ? item.pagePath : `/${item.pagePath}` }))

if (BULGE_ENABLE) {
  if (tabbarList.length % 2 === 1) {
    console.error('tabbar 数量必须是偶数，否则样式很奇怪！！')
  }
  tabbarList.splice(tabbarList.length / 2, 0, {
    isBulge: true,
  } as CustomTabBarItem)
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
  setAutoCurIdx(path: string) {
    const index = tabbarList.findIndex(item => item.pagePath === path)
    // console.log('index:', index, path)
    // console.log('tabbarList:', tabbarList)
    if (index === -1) {
      this.setCurIdx(0)
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
