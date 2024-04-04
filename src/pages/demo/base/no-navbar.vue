<route lang="json5">
{
  style: { navigationBarTitleText: '无导航栏', navigationStyle: 'custom' },
}
</route>

<template>
  <fly-navbar />
  <view class="bg-green-300 min-h-20" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view class="p-4">自定义导航栏，设置"navigationStyle":"custom"</view>
    <view class="p-4">通常页面顶部有一个图片或背景色</view>
    <view class="p-4">本实例没有导航栏，但是需要返回</view>
  </view>
  <fly-content :line="20" />
</template>

<script lang="ts" setup>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>
