<route lang="json5">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '关于',
  },
}
</route>

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

function gotoAlova() {
  uni.navigateTo({
    url: '/pages/about/alova',
  })
}
</script>

<template>
  <view>
    <view class="mt-8 text-center text-3xl">
      鸽友们好，我是
      <text class="text-red-500">
        菲鸽
      </text>
    </view>
    <RequestComp />
    <UploadComp />
    <button class="w-200px text-green" @click="gotoAlova">
      前往 alova 页面
    </button>
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
