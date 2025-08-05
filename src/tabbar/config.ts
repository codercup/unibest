import type { TabBar } from '@uni-helper/vite-plugin-uni-pages'

type FgTabBarItem = TabBar['list'][0] & {
  iconType: 'uniUi' | 'uiLib' | 'unocss' | 'iconfont' | 'local'
  icon: any // 其实是 string 类型，这里是为了避免 ts 报错
  activeIcon?: string // 只有在 local 模式下才需要，传递的是高亮的图片（PS： 不建议用 local 模式）
}

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
export const selectedTabbarStrategy = TABBAR_MAP.NATIVE_TABBAR

// TODO: 2/3. 更新下面的tabbar配置
// selectedTabbarStrategy==NATIVE_TABBAR(1) 时，需要填 iconPath 和 selectedIconPath
// selectedTabbarStrategy==CUSTOM_TABBAR(2,3) 时，需要填 iconType 和 icon
// selectedTabbarStrategy==NO_TABBAR(0) 时，tabbarList 不生效
export const tabbarList: FgTabBarItem[] = [
  {
    iconPath: 'static/tabbar/home.png',
    selectedIconPath: 'static/tabbar/homeHL.png',
    pagePath: 'pages/index/index',
    text: '首页',
    // 本框架内置了 uniapp 官方UI库 （uni-ui)的图标库
    // 使用方式如：<uni-icons type="home" size="30"/>
    // 图标列表地址：https://uniapp.dcloud.net.cn/component/uniui/uni-icons.html
    iconType: 'uniUi',
    icon: 'home',
  },
  // {
  //   iconPath: 'static/tabbar/home.png',
  //   selectedIconPath: 'static/tabbar/homeHL.png',
  //   pagePath: 'pages/index/index',
  //   text: '首页',
  //   // 选用 UI 框架自带的 icon 时，iconType 为 uiLib
  //   // TODO: 3/3. 需要自行替换vue代码中的图标代码，具体代码在 `tabbar/index.vue` 62行
  //   // 如：<wd-icon name="home" /> (https://wot-design-uni.cn/component/icon.html)
  //   // 如：<uv-icon name="home" /> (https://www.uvui.cn/components/icon.html)
  //   // 如：<sar-icon name="image" /> (https://sard.wzt.zone/sard-uniapp-docs/components/icon)(sar没有home图标^_^)
  //   iconType: 'uiLib',
  //   icon: 'home',
  // },
  {
    iconPath: 'static/tabbar/example.png',
    selectedIconPath: 'static/tabbar/exampleHL.png',
    pagePath: 'pages/about/about',
    text: '关于',
    // 注意 unocss 图标需要如下处理：（二选一）
    // 1）在fg-tabbar.vue页面上引入一下并注释掉（见tabbar/index.vue代码第2行）
    // 2）配置到 unocss.config.ts 的 safelist 中
    iconType: 'unocss',
    icon: 'i-carbon-code',
  },
  // {
  //   pagePath: 'pages/mine/index',
  //   text: '我的',
  //   // 注意 iconfont 图标需要额外加上 'iconfont'，如下
  //   iconType: 'iconfont',
  //   icon: 'iconfont icon-my',
  // },
  // {
  //   iconPath: 'static/tabbar/home.png',
  //   selectedIconPath: 'static/tabbar/homeHL.png',
  //   pagePath: 'pages/index/index',
  //   text: '首页',
  //   // 使用 ‘local’时，需要配置 icon + iconActive 2张图片（不推荐）
  //   // 既然已经用了自定义tabbar了，就不建议用图片了，所以不推荐
  //   iconType: 'local',
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
  list: tabbarList as unknown as TabBar['list'],
}

// 0和1 需要显示底部的tabbar的各种配置，以利用缓存
export const tabBar = tabbarCacheEnable ? _tabbar : undefined
