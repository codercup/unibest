<!-- type=home|page，默认为page。这里使用 type="home" 申明为首页，其他页面不需要设置 -->
<route type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view class="bg-white h-full overflow-hidden pt-2 px-4">
    <view class="mt-8">
      <image src="/static/logo.svg" alt="" class="w-40 h-40 block mx-auto" />
    </view>
    <view class="text-center text-4xl main-title-color mt-4">unibest</view>
    <view class="text-center text-2xl mt-4 mb-8">最好用的 uniapp 开发框架</view>
    <view class="text-center text-xl">
      unibest 是由 uniapp + Vue3 + Ts + Vite4 + UnoCss + UniUI 驱动的跨端快速启动模板，使用 VS Code
      开发，具有代码提示、自动格式化、统一配置、代码片段等功能，同时内置了大量平时开发常用的基本组件，开箱即用，让你编写
      uniapp 拥有 best 体验。</view
    >
    <view class="text-blue mt-8 text-center text-xl">
      <text class="font-800">详细示例 </text>参考 hello-unibest
    </view>
    <view class="m-2"> https://github.com/codercup/hello-unibest </view>
    <button @click="onCopy">复制hello-unibest github地址</button>
  </view>
</template>

<script lang="ts" setup>
const onCopy = () => {
  uni.setClipboardData({
    data: 'https://github.com/codercup/hello-unibest',
    fail: (fail) => {
      console.error('fail', fail)
    },
    success: (success) => {
      console.log('success', success)
    },
  })
}
</script>

<style>
.main-title-color {
  color: #d14328;
}
</style>
