<route lang="json5">
{
  style: {
    navigationBarTitleText: '关于',
    navigationStyle: 'custom', // 开启自定义导航栏
  },
}
</route>

<template>
  <view>
    <fg-navbar>关于</fg-navbar>
    <view
      class="bg-white overflow-hidden pt-2 px-4"
      :style="{ marginTop: safeAreaInsets?.top + 'px' }"
    >
      <view class="text-center text-3xl mt-8">
        鸽友们好，我是
        <text class="text-red-500">菲鸽</text>
      </view>
      <view class="test-css">测试 scss 样式</view>
      <RequestComp />
      <UploadComp />
    </view>
  </view>
</template>

<script lang="ts" setup>
import RequestComp from './components/request.vue'
import UploadComp from './components/upload.vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
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
