import type { TabBar } from '@uni-helper/vite-plugin-uni-pages'

type NativeTabBarItem = TabBar['list'][0]

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

// NATIVE_TABBAR(1) 和 CUSTOM_TABBAR_WITH_CACHE(2) 时，需要tabbar缓存
/** 是否启用 tabbar 缓存 */
export const tabbarCacheEnable
  = [TABBAR_MAP.NATIVE_TABBAR, TABBAR_MAP.CUSTOM_TABBAR_WITH_CACHE].includes(selectedTabbarStrategy)

// CUSTOM_TABBAR_WITH_CACHE(2) 和 CUSTOM_TABBAR_WITHOUT_CACHE(3) 时，启用自定义tabbar
/** 是否启用自定义 tabbar */
export const customTabbarEnable
  = [TABBAR_MAP.CUSTOM_TABBAR_WITH_CACHE, TABBAR_MAP.CUSTOM_TABBAR_WITHOUT_CACHE].includes(selectedTabbarStrategy)

// CUSTOM_TABBAR_WITH_CACHE(2)时，需要隐藏原生tabbar
/** 是否需要隐藏原生 tabbar */
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
