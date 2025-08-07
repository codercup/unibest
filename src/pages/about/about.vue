<route lang="jsonc" type="page">
{
  "layout": "tabbar",
  "style": {
    "navigationBarTitleText": "关于"
  }
}
</route>

<script lang="ts" setup>
import RequestComp from './components/request.vue'

// 奇怪：同样的代码放在 vue 里面不会校验到错误，放在 .ts 文件里面会校验到错误
// const testOxlint = (name: string) => {
//   console.log('oxlint')
// }
// testOxlint('oxlint')
console.log('about')

function gotoAlova() {
  uni.navigateTo({
    url: '/pages/about/alova',
  })
}
function gotoVueQuery() {
  uni.navigateTo({
    url: '/pages/about/vue-query',
  })
}
function gotoSubPage() {
  uni.navigateTo({
    url: '/pages-sub/demo/index',
  })
}
</script>

<template>
  <view>
    <view class="mt-8 text-center text-xl text-gray-400">
      组件使用、请求调用、unocss
    </view>
    <RequestComp />
    <view class="mb-6 h-1px bg-#eee" />
    <view class="text-center">
      <button type="primary" size="mini" class="w-160px" @click="gotoAlova">
        前往 alova 示例页面
      </button>
    </view>
    <view class="text-center">
      <button type="primary" size="mini" class="w-160px" @click="gotoVueQuery">
        vue-query 示例页面
      </button>
    </view>
    <view class="text-center">
      <button type="primary" size="mini" class="w-160px" @click="gotoSubPage">
        前往分包页面
      </button>
    </view>
    <view class="mt-6 text-center text-sm">
      <view class="inline-block w-80% text-gray-400">
        为了方便脚手架动态生成不同UI模板，本页的按钮统一使用UI库无关的原生button
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.test-css {
  // 16rpx=>0.5rem
  padding-bottom: 16rpx;
  // mt-4=>1rem=>16px;
  margin-top: 16px;
  text-align: center;
}
</style>
