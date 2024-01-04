import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'white',
    navigationBarTitleText: 'vue3-uniapp',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^Fly(.*)': '@/components/fly-$1/fly-$1.vue',
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
  /**
   * 设置默认路由入口
   * @default 'pages/index' || 'pages/index/index'
   */
  // homePage: 'pages/index/index',
  /**
   * 是否扫描并合并 pages.json 中 pages 字段
   * @default true
   */
  // mergePages: true,

  /**
   * 扫描的目录
   * @default 'src/pages'
   */
  // dir: 'src/pages',
  /**
   * 自定义块语言
   * @default 'json5' 可选值：'json5' | 'json' | 'yaml' | 'yml',
   */
  // routeBlockLang: 'json5', // 注意json5允许注释，单行多行都可以，还有其他很多特性，推荐使用
  /**
   * 排除的页面，相对于 dir 和 subPackages，通常把这些目录里面的components里面的文件排除掉
   * @default []
   */
  exclude: ['**/components/**/*.*'],
  // 你也可以定义 pages 字段，它具有最高的优先级。
  pages: [],
  /**
   * subPackages 扫描的目录，例如：src/pages-sub
   * @type SubPackage[] | undefined
   */
  subPackages: undefined,
})
