<script lang="ts" setup>
import { HOME_PAGE } from '@/utils'

definePage({
  style: {
    // 'custom' 表示开启自定义导航栏，默认 'default'
    navigationStyle: 'custom',
  },
})

function goBack() {
  // 当pages.config.ts中配置了tabbar页面时，使用switchTab切换到首页
  // 否则使用navigateTo返回首页
  uni.switchTab({ url: HOME_PAGE })
}
</script>

<template>
  <view class="h-screen flex flex-col items-center justify-center">
    <view> 404 </view>
    <view> 页面不存在 </view>
    <button class="mt-6 w-40 text-center" @click="goBack">
      返回首页
    </button>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
