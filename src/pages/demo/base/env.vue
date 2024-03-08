<route lang="json5" type="page">
{
  style: { navigationBarTitleText: '环境获取' },
}
</route>

<template>
  <view class="mt-4 ml-4"> 当前环境 isDev：{{ isDev }} </view>
</template>

<script lang="ts" setup>
import { isDev } from '@/utils'

console.log(isDev)
</script>

<style lang="scss" scoped>
//
</style>
