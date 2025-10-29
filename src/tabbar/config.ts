import type { TabBar } from '@uni-helper/vite-plugin-uni-pages'
import type { CustomTabBarItem, NativeTabBarItem } from './types'

/**
 * tabbar 选择的策略，更详细的介绍见 tabbar.md 文件
 * 0: 'NO_TABBAR' `无 tabbar`
 * 1: 'NATIVE_TABBAR'  `完全原生 tabbar`
 * 2: 'CUSTOM_TABBAR_WITH_CACHE' `有缓存自定义 tabbar`
 * 3: 'CUSTOM_TABBAR_WITHOUT_CACHE' `无缓存自定义 tabbar`
 *
 * 温馨提示：本文件的任何代码更改了之后，都需要重新运行，否则 pages.json 不会更新导致配置不生效
 */
export const TABBAR_STRATEGY_MAP = {
  NO_TABBAR: 0,
  NATIVE_TABBAR: 1,
  CUSTOM_TABBAR_WITH_CACHE: 2,
  CUSTOM_TABBAR_WITHOUT_CACHE: 3,
}

// TODO: 1/3. 通过这里切换使用tabbar的策略
// 如果是使用 NO_TABBAR(0)，nativeTabbarList 和 customTabbarList 都不生效(里面的配置不用管)
// 如果是使用 NATIVE_TABBAR(1)，只需要配置 nativeTabbarList，customTabbarList 不生效
// 如果是使用 CUSTOM_TABBAR(2,3)，只需要配置 customTabbarList，nativeTabbarList 不生效
export const selectedTabbarStrategy = TABBAR_STRATEGY_MAP.CUSTOM_TABBAR_WITH_CACHE

// TODO: 2/3. 使用 NATIVE_TABBAR 时，更新下面的 tabbar 配置
export const nativeTabbarList: NativeTabBarItem[] = [
  {
    iconPath: 'static/tabbar/home.png',
    selectedIconPath: 'static/tabbar/homeHL.png',
    pagePath: 'pages/index/index',
    text: '首页',
  },
  {
    iconPath: 'static/tabbar/personal.png',
    selectedIconPath: 'static/tabbar/personalHL.png',
    pagePath: 'pages/me/me',
    text: '个人',
  },
]

// TODO: 3/3. 使用 CUSTOM_TABBAR(2,3) 时，更新下面的 tabbar 配置
// 如果需要配置鼓包，需要在 'tabbar/store.ts' 里面设置，最后在 `tabbar/index.vue` 里面更改鼓包的图片
export const customTabbarList: CustomTabBarItem[] = [
  {
    text: '首页',
    pagePath: 'pages/index/index',
    // 注意 unocss 图标需要如下处理：（二选一）
    // 1）在fg-tabbar.vue页面上引入一下并注释掉（见tabbar/index.vue代码第2行）
    // 2）配置到 unocss.config.ts 的 safelist 中
    iconType: 'unocss',
    icon: 'i-carbon-home',
    // badge: 'dot',
  },
  {
    pagePath: 'pages/me/me',
    text: '我的',
    // 1）在fg-tabbar.vue页面上引入一下并注释掉（见tabbar/index.vue代码第2行）
    // 2）配置到 unocss.config.ts 的 safelist 中
    iconType: 'unocss',
    icon: 'i-carbon-user',
    // badge: 10,
  },
  // 其他类型演示
  // 1、uiLib
  // {
  //   pagePath: 'pages/index/index',
  //   text: '首页',
  //   iconType: 'uiLib',
  //   icon: 'home',
  // },
  // 2、iconfont
  // {
  //   pagePath: 'pages/index/index',
  //   text: '首页',
  //   // 注意 iconfont 图标需要额外加上 'iconfont'，如下
  //   iconType: 'iconfont',
  //   icon: 'iconfont icon-my',
  // },
  // 3、image
  // {
  //   pagePath: 'pages/index/index',
  //   text: '首页',
  //   // 使用 ‘image’时，需要配置 icon + iconActive 2张图片
  //   iconType: 'image',
  //   icon: '/static/tabbar/home.png',
  //   iconActive: '/static/tabbar/homeHL.png',
  // },
]

/**
 * 是否启用 tabbar 缓存
 * NATIVE_TABBAR(1) 和 CUSTOM_TABBAR_WITH_CACHE(2) 时，需要tabbar缓存
 */
export const tabbarCacheEnable
  = [TABBAR_STRATEGY_MAP.NATIVE_TABBAR, TABBAR_STRATEGY_MAP.CUSTOM_TABBAR_WITH_CACHE].includes(selectedTabbarStrategy)

/**
 * 是否启用自定义 tabbar
 * CUSTOM_TABBAR(2,3) 时，启用自定义tabbar
 */
export const customTabbarEnable
  = [TABBAR_STRATEGY_MAP.CUSTOM_TABBAR_WITH_CACHE, TABBAR_STRATEGY_MAP.CUSTOM_TABBAR_WITHOUT_CACHE].includes(selectedTabbarStrategy)

/**
 * 是否需要隐藏原生 tabbar
 * CUSTOM_TABBAR_WITH_CACHE(2) 时，需要隐藏原生tabbar
 */
export const needHideNativeTabbar = selectedTabbarStrategy === TABBAR_STRATEGY_MAP.CUSTOM_TABBAR_WITH_CACHE

const _tabbarList = customTabbarEnable ? customTabbarList.map(item => ({ text: item.text, pagePath: item.pagePath })) : nativeTabbarList
export const tabbarList = customTabbarEnable ? customTabbarList : nativeTabbarList

const _tabbar: TabBar = {
  // 只有微信小程序支持 custom。App 和 H5 不生效
  custom: selectedTabbarStrategy === TABBAR_STRATEGY_MAP.CUSTOM_TABBAR_WITH_CACHE,
  color: '#999999',
  selectedColor: '#018d71',
  backgroundColor: '#F8F8F8',
  borderStyle: 'black',
  height: '50px',
  fontSize: '10px',
  iconWidth: '24px',
  spacing: '3px',
  list: _tabbarList as unknown as TabBar['list'],
}

export const tabBar = tabbarCacheEnable ? _tabbar : undefined
