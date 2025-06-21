// 是否使用自定义的tabbar?
export const CUSTOM_TABBAR_ENABLE = false

// CUSTOM_TABBAR_ENABLE 为 true 时，可以不填 iconPath 和 selectedIconPath
// CUSTOM_TABBAR_ENABLE 为 false 时，可以不填 icon 和 iconType
export const tabbarList = [
  {
    iconPath: 'static/tabbar/home.png',
    selectedIconPath: 'static/tabbar/homeHL.png',
    pagePath: 'pages/index/index',
    text: '首页',
    icon: 'home',
    iconType: 'wot',
  },
  {
    iconPath: 'static/tabbar/example.png',
    selectedIconPath: 'static/tabbar/exampleHL.png',
    pagePath: 'pages/about/about',
    text: '关于',
    icon: 'i-carbon-code',
    iconType: 'unocss',
  },
  // {
  //   pagePath: 'pages/my/index',
  //   text: '我的',
  //   icon: '/static/logo.svg',
  //   iconType: 'local',
  // },
  // {
  //   pagePath: 'pages/mine/index',
  //   text: '我的',
  //   icon: 'iconfont icon-my',
  //   iconType: 'iconfont',
  // },
]

// midButton 仅App和H5支持
export const midButton = {
  iconPath: '/static/logo.svg',
  text: '发布',
}

const _tabbar = {
  color: '#999999',
  selectedColor: '#018d71',
  backgroundColor: '#F8F8F8',
  borderStyle: 'black',
  height: '50px',
  fontSize: '10px',
  iconWidth: '24px',
  spacing: '3px',
  list: tabbarList as any,
  // midButton 仅App和H5支持
  midButton: midButton,
}

export const tabBar = CUSTOM_TABBAR_ENABLE ? undefined : _tabbar
