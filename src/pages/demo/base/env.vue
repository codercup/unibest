<route lang="json5" type="page">
{
  style: { navigationBarTitleText: '环境获取' },
}
</route>

<template>
  <view class="mt-4 ml-4"> 当前环境 isDev：{{ isDev }} </view>
</template>

<script lang="ts" setup>
const isDev = import.meta.env.DEV
</script>

<style lang="scss" scoped>
//
</style>
