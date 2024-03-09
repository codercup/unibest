<route lang="json5" type="page">
{
  needLogin: true,
  style: { navigationBarTitleText: '跳转中...' },
}
</route>

<template>
  <view class="mt-8 text-center">
    <view class="leading-10">
      用户是否已登录：<text>{{ isLogined ? '是' : '否' }}</text>
    </view>
    <view class="text-gray">未登录不能来本页面</view>
    <view class="text-gray">已登录才能来本页面</view>
    <view class="text-gray">增加微信分享功能，方便测试路由拦截</view>
  </view>
</template>

<script lang="ts" setup>
import { currRoute } from '@/utils'

const { redirectPath } = currRoute()

uni.showLoading({
  title: '跳转中...',
})

uni.redirectTo({
  url: redirectPath,
  complete: () => {
    uni.hideLoading()
  },
})
</script>

<style lang="scss" scoped>
//
</style>
