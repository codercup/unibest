import type { TabBar } from '@uni-helper/vite-plugin-uni-pages'

type NativeTabBarItem = TabBar['list'][0]

type CustomTabBarItem = (Pick<NativeTabBarItem, 'text' | 'pagePath'> & {
  iconType: 'uniUi' | 'uiLib' | 'unocss' | 'iconfont' | 'image' // 不建议用 image 模式，需要配置2张图
  icon: any // 其实是 string 类型，这里是为了避免 ts 报错 (tabbar/index.vue 里面 uni-icons 那行)
  activeIcon?: string // 只有在 image 模式下才需要，传递的是高亮的图片（PS： 不建议用 image 模式）
  badge?: number | 'dot' // badge 显示一个数字或 小红点（样式可以直接在 tabbar/index.vue 里面修改）
  isBulge?: boolean // 是否是中间的鼓包tabbarItem
})

/**
 * tabbar 选择的策略，更详细的介绍见 tabbar.md 文件
 * 0: 'NO_TABBAR' `无 tabbar`
 * 1: 'NATIVE_TABBAR'  `完全原生 tabbar`
 * 2: 'CUSTOM_TABBAR_WITH_CACHE' `有缓存自定义 tabbar`
 * 3: 'CUSTOM_TABBAR_WITHOUT_CACHE' `无缓存自定义 tabbar`
 *
 * 温馨提示：本文件的任何代码更改了之后，都需要重新运行，否则 pages.json 不会更新导致配置不生效
 */
export const TABBAR_MAP = {
  NO_TABBAR: 0,
  NATIVE_TABBAR: 1,
  CUSTOM_TABBAR_WITH_CACHE: 2,
  CUSTOM_TABBAR_WITHOUT_CACHE: 3,
}

// TODO: 1/3. 通过这里切换使用tabbar的策略
export const selectedTabbarStrategy = TABBAR_MAP.CUSTOM_TABBAR_WITH_CACHE

// TODO: 2/3. 更新下面的 tabbar 配置
// 如果是使用 NO_TABBAR(0)，nativeTabbarList 和 customTabbarList 都不生效(里面的配置不用管)
// 如果是使用 NATIVE_TABBAR(1)，customTabbarList 不生效(里面的配置不用管)
// 如果是使用 CUSTOM_TABBAR(2,3)，nativeTabbarList 不生效(里面的配置不用管)
// pagePath 是 nativeTabbarList 和 customTabbarList 的关联点，如果没有对应上，会有问题！！
export const nativeTabbarList: NativeTabBarItem[] = [
  {
    iconPath: 'static/tabbar/home.png',
    selectedIconPath: 'static/tabbar/homeHL.png',
    pagePath: 'pages/index/index',
    text: '首页',
  },
  {
    iconPath: 'static/tabbar/example.png',
    selectedIconPath: 'static/tabbar/exampleHL.png',
    pagePath: 'pages/about/about',
    text: '关于',
  },
]

// pagePath 是 nativeTabbarList 和 customTabbarList 的关联点，如果没有对应上，会有问题！！
// 如果希望通过接口调用 customTabbarList，可以在 tabbar/index.vue 文件里面调用接口
// 本文件因为需要提前编译生成 pages.json, 接口拦截还不生效，无法正常调用接口
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
    text: nativeTabbarList[1].text,
    pagePath: nativeTabbarList[1].pagePath, // pagePath 是两者的关联点
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

// NATIVE_TABBAR(1) 和 CUSTOM_TABBAR_WITH_CACHE(2) 时，需要tabbar缓存
export const tabbarCacheEnable = selectedTabbarStrategy === TABBAR_MAP.NATIVE_TABBAR
  || selectedTabbarStrategy === TABBAR_MAP.CUSTOM_TABBAR_WITH_CACHE

// CUSTOM_TABBAR_WITH_CACHE(2) 和 CUSTOM_TABBAR_WITHOUT_CACHE(3) 时，启用自定义tabbar
export const customTabbarEnable = selectedTabbarStrategy === TABBAR_MAP.CUSTOM_TABBAR_WITH_CACHE
  || selectedTabbarStrategy === TABBAR_MAP.CUSTOM_TABBAR_WITHOUT_CACHE

// CUSTOM_TABBAR_WITH_CACHE(2)时，需要隐藏原生tabbar
export const nativeTabbarNeedHide = selectedTabbarStrategy === TABBAR_MAP.CUSTOM_TABBAR_WITH_CACHE

const _tabbar: TabBar = {
  // 只有微信小程序支持 custom。App 和 H5 不生效
  custom: selectedTabbarStrategy === TABBAR_MAP.CUSTOM_TABBAR_WITH_CACHE,
  color: '#999999',
  selectedColor: '#018d71',
  backgroundColor: '#F8F8F8',
  borderStyle: 'black',
  height: '50px',
  fontSize: '10px',
  iconWidth: '24px',
  spacing: '3px',
  list: nativeTabbarList as unknown as TabBar['list'],
}

export const tabbarList = nativeTabbarList

// 0和1 需要显示底部的tabbar的各种配置，以利用缓存
export const tabBar = tabbarCacheEnable ? _tabbar : undefined
