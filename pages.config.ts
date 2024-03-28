import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '@navBgColor',
    navigationBarTextStyle: '@navTxtStyle',
    backgroundColor: '@bgColor',
    backgroundTextStyle: '@bgTxtStyle',
    backgroundColorTop: '@bgColorTop',
    backgroundColorBottom: '@bgColorBottom',
    h5: {
      navigationStyle: 'custom',
    },
  },
  easycom: {
    autoscan: true,
    custom: {
      '^uv-(.*)': '@climblee/uv-ui/components/uv-$1/uv-$1.vue',
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
    },
  },
  tabBar: {
    height: '50px',
    fontSize: '10px',
    iconWidth: '30px',
    spacing: '3px',
    color: '@tabFontColor',
    selectedColor: '@tabSelectedColor',
    backgroundColor: '@tabBgColor',
    borderStyle: '@tabBorderStyle',
    list: [
      {
        iconPath: '@iconPath1',
        selectedIconPath: '@selectedIconPath1',
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        iconPath: '@iconPath2',
        selectedIconPath: '@selectedIconPath2',
        pagePath: 'pages/demo/index',
        text: '示例',
      },
    ],
  },
})
