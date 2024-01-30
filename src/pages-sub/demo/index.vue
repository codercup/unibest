<route lang="json5" type="page">
{
  style: { navigationBarTitleText: '分包页面 标题' },
}
</route>

<template>
  <view class="text-center">
    <view class="m-8"> http://localhost:9000/#/pages-sub/demo/index </view>
    <view class="text-green-500"> 分包页面demo </view>
    <view class="test titi">test global css</view>
    <view class="text-green-500 text-xl mt-10">uvui 引入演示</view>
    <view class="center my-10">
      <uv-icon name="photo" class="text-center m-auto"></uv-icon>
      <uv-icon name="photo" class="text-center m-auto"></uv-icon>
      <uv-icon name="photo" class="text-center m-auto"></uv-icon>
    </view>
    <uv-qrcode
      ref="qrcode"
      size="200px"
      class="m-auto"
      value="https://gitee.com/codercup/unibest"
    ></uv-qrcode>
  </view>
</template>

<script lang="ts" setup>
// code here
</script>

<style lang="scss" scoped>
//
</style>
