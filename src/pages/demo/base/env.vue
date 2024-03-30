<route lang="json5" type="page">
{
  style: { navigationBarTitleText: '环境获取' },
}
</route>

<template>
  <view class="mt-4 ml-4">
    当前环境 import.meta.env.DEV:
    <text class="text-red-500 ml-4">{{ isDev }}</text>
  </view>
  <view class="mt-4 ml-4">
    当前环境所使用的环境文件
    <text class="text-red-500 ml-4">{{ VITE_ENV_FILE }}</text>
  </view>
  <view class="text-red-500 mt-8 ml-4">环境变量的使用与 --mode 参数配合使用</view>
</template>

<script lang="ts" setup>
const isDev = import.meta.env.DEV
const { VITE_ENV_FILE } = import.meta.env
</script>
