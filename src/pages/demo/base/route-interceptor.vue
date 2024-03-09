<route lang="json5" type="page">
{
  needLogin: true,
  style: { navigationBarTitleText: '路由拦截' },
}
</route>

<template>
  <view class="mt-8 text-center">
    <view class="leading-10">
      用户是否已登录：<text>{{ !!userStore?.userInfo?.token }}</text>
    </view>
    <view class="text-gray">未登录不能来本页面</view>
    <view class="text-gray">已登录才能来本页面</view>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
//
</style>
