// pages.config.ts
import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  // 你也可以定义 pages 字段，它具有最高的优先级。
  pages: [],
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'vue3-uniapp',
  },
  easycom: {
    autoscan: true,
    custom: {
      // 以 Fly 开头的组件，在 components 文件夹中查找引入（需要重启服务器）
      '^Fly(.*)': '@/components/fly-$1/fly-$1.vue',
      '^fly-(.*)': '@/components/fly-$1/fly-$1.vue',
      // uni-ui 规则如下配置
      '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
    },
  },
})
