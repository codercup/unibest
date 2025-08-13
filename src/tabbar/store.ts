import { tabbarList } from './config'
/**
 * tabbar 状态，增加 storageSync 保证刷新浏览器时在正确的 tabbar 页面
 * 使用reactive简单状态，而不是 pinia 全局状态
 */
export const tabbarStore = reactive({
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
    if (index !== -1) {
      this.setCurIdx(index)
    }
    else {
      this.setCurIdx(0)
    }
  },
  restorePrevIdx() {
    if (this.prevIdx === this.curIdx)
      return
    this.setCurIdx(this.prevIdx)
    this.prevIdx = uni.getStorageSync('app-tabbar-index') || 0
  },
})
