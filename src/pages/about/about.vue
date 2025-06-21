<route lang="json5">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '关于',
  },
}
</route>

<template>
  <view>
    <view class="text-center text-3xl mt-8">
      鸽友们好，我是
      <text class="text-red-500">菲鸽</text>
    </view>
    <RequestComp />
    <UploadComp />
  </view>
</template>

<script lang="ts" setup>
import RequestComp from './components/request.vue'
import UploadComp from './components/upload.vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 奇怪：同样的代码放在 vue 里面不会校验到错误，放在 .ts 文件里面会校验到错误
// const testOxlint = (name: string) => {
//   console.log('oxlint')
// }
// testOxlint('oxlint')
console.log('about')
</script>

<style lang="scss" scoped>
.test-css {
  // 16rpx=>0.5rem
  padding-bottom: 16rpx;
  // mt-4=>1rem=>16px;
  margin-top: 16px;
  text-align: center;
}
</style>
