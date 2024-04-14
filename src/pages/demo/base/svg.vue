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
    <view class="text-center m-4 text-blue-500">目前发现，小程序和APP只支持 image 方式</view>
    <view class="text-center m-4 text-blue-500">下面的几种方式，都不支持</view>
    <!-- #ifdef H5 -->
    <TaskComponent class="h-20 w-20" />
    <SvgIcon name="task" class="h-20 w-20"></SvgIcon>
    <SvgIcon name="dir-task2" class="h-20 w-20"></SvgIcon>
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
// eslint-disable-next-line import/no-duplicates
import iconUrl from './task.svg?url'
// #ifdef H5
// 小程序不支持 component 方式引入，运行会报错，APP不报错，但是不生效
// eslint-disable-next-line import/no-duplicates
import TaskComponent from './task.svg?component'
// #endif
</script>

<style lang="scss" scoped>
//
</style>
