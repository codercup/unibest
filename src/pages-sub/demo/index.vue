<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "分包页面"
  }
}
</route>

<script lang="ts" setup>
// code here
import RequestComp from './components/request.vue'
</script>

<template>
  <view class="text-center">
    <view class="m-8">
      http://localhost:9000/#/pages-sub/demo/index
    </view>
    <view class="my-4 text-green-500">
      分包页面demo
    </view>
    <view class="text-blue-500">
      分包页面里面的components示例
    </view>
    <view>
      <RequestComp />
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
