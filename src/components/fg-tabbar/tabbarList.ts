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
