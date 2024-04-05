<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: 'svg使用',
  },
}
</route>

<template>
  <view class="p-4">
    <view class="text-center m-4">svg 多种使用方法</view>
    <image src="/static/svg/task.svg" mode="scaleToFill" class="h-20 w-20" />
    <image :src="iconUrl" mode="scaleToFill" class="h-20 w-20" />
    <!-- #ifdef H5 -->
    <TaskComponent class="h-20 w-20" />
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
// eslint-disable-next-line import/no-duplicates
import iconUrl from './task.svg?url'
// #ifdef H5
// 小程序不支持 compnent 方式引入，运行会报错
// eslint-disable-next-line import/no-duplicates
import TaskComponent from './task.svg?component'
// #endif
</script>

<style lang="scss" scoped>
//
</style>
