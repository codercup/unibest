export const tabbarList = [
  {
    path: '/pages/index/about',
    icon: 'home',
    isWotIcon: true,
    title: '首页',
  },
  {
    path: '/pages/index/index',
    icon: 'i-carbon-user-avatar',
    isWotIcon: false,
    title: '我的',
  },
]

/**
 * tabbar 状态，增加 storageSync 保证刷新浏览器时在正确的 tabbar 页面
 */
export const tabbarStore = reactive({
  curIdx: uni.getStorageSync('app-tabbar-index') || 0,
  setCurIdx(idx: number) {
    this.curIdx = idx
    uni.setStorageSync('app-tabbar-index', idx)
  },
})
