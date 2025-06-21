export const tabbarList = [
  // 注意tabbar路由需要使用 layout:tabbar 布局
  {
    pagePath: 'pages/index/index',
    text: '首页',
    icon: 'home',
    iconType: 'wot',
  },
  {
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

export const CUSTOM_TABBAR_ENABLE = false
export const tabBar = CUSTOM_TABBAR_ENABLE ? undefined : _tabbar
