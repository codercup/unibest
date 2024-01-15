import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'vue3-uniapp',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^fly-(.*)': '@/components/fly-$1/fly-$1.vue',
      '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
    },
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#018d71',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/homeHL.png',
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        iconPath: 'static/tabbar/example.png',
        selectedIconPath: 'static/tabbar/exampleHL.png',
        pagePath: 'pages/demo/index',
        text: '示例',
      },
      {
        iconPath: 'static/tabbar/personal.png',
        selectedIconPath: 'static/tabbar/personalHL.png',
        pagePath: 'pages/my/index',
        text: '我的',
      },
    ],
  },
  // 你也可以定义 pages 字段，它具有最高的优先级。
  pages: [],
  /**
   * subPackages 扫描的目录，例如：src/pages-sub
   * @type SubPackage[] | undefined
   */
  subPackages: undefined,
})
