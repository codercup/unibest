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
    color: '#7A7E83',
    selectedColor: '#00f',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: 'static/tab-icons/extui.png',
        selectedIconPath: 'static/tab-icons/extuiHL.png',
        text: '首页',
      },
      {
        pagePath: 'pages/throughout/index',
        iconPath: 'static/tab-icons/template.png',
        selectedIconPath: 'static/tab-icons/templateHL.png',
        text: '通屏',
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
