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

export const tabbarStore = reactive({
  curIdx: 0,
  setCurIdx(idx: number) {
    this.curIdx = idx
  },
})
