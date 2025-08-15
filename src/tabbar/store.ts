import { tabbarList } from './config'

interface CustomTabBarItem {
  text: string
  pagePath: string
  iconType: 'uniUi' | 'uiLib' | 'unocss' | 'iconfont' | 'image' // 不建议用 image 模式，需要配置2张图
  icon: any // 其实是 string 类型，这里是为了避免 ts 报错 (tabbar/index.vue 里面 uni-icons 那行)
  activeIcon?: string // 只有在 image 模式下才需要，传递的是高亮的图片（PS： 不建议用 image 模式）
  badge?: number | 'dot' // badge 显示一个数字或 小红点（样式可以直接在 tabbar/index.vue 里面修改）
  isBulge?: boolean // 是否是中间的鼓包tabbarItem
}

// pagePath 是 nativeTabbarList 和 customTabbarList 的关联点，如果没有对应上，会有问题！！
// 如果希望通过接口调用 customTabbarList，可以在 tabbar/index.vue 文件里面调用接口
export const customTabbarList: CustomTabBarItem[] = [
  {
    // text 和 pagePath 可以自己直接写，也可以通过索引从 nativeTabbarList 中获取
    text: '首页',
    pagePath: 'pages/index/index', // pagePath 是两者的关联点
    // 本框架内置了 uniapp 官方UI库 （uni-ui)的图标库
    // 使用方式如：<uni-icons type="home" size="30"/>
    // 图标列表地址：https://uniapp.dcloud.net.cn/component/uniui/uni-icons.html
    iconType: 'uniUi',
    icon: 'home',
    // badge: 'dot',
  },
  {
    text: tabbarList[1].text,
    pagePath: tabbarList[1].pagePath, // pagePath 是两者的关联点
    // 注意 unocss 图标需要如下处理：（二选一）
    // 1）在fg-tabbar.vue页面上引入一下并注释掉（见tabbar/index.vue代码第2行）
    // 2）配置到 unocss.config.ts 的 safelist 中
    iconType: 'unocss',
    icon: 'i-carbon-code',
    // badge: 10,
  },

  // {
  //   pagePath: 'pages/mine/index',
  //   text: '我的',
  //   // 注意 iconfont 图标需要额外加上 'iconfont'，如下
  //   iconType: 'iconfont',
  //   icon: 'iconfont icon-my',
  // },
  // {
  //   pagePath: 'pages/index/index',
  //   text: '首页',
  //   // 使用 ‘image’时，需要配置 icon + iconActive 2张图片（不推荐）
  //   // 既然已经用了自定义tabbar了，就不建议用图片了，所以不推荐
  //   iconType: 'image',
  //   icon: '/static/tabbar/home.png',
  //   iconActive: '/static/tabbar/homeHL.png',
  // },
]
/**
 * tabbar 状态，增加 storageSync 保证刷新浏览器时在正确的 tabbar 页面
 * 使用reactive简单状态，而不是 pinia 全局状态
 */
export const tabbarStore = reactive({
  tabbarList: customTabbarList,
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
