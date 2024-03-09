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
    <view class="text-gray">增加微信分享功能，方便测试路由拦截</view>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'

import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'

const userStore = useUserStore()

/** 激活“分享给好友” */
onShareAppMessage((options: Page.ShareAppMessageOption): Page.CustomShareContent => {
  console.log('options:', options)
  return {
    title: '自定义分享标题',
    desc: 'unibest 演示示例',
    path: '/pages/index/index?id=xxx',
  }
})
/** 激活“分享到朋友圈”， 注意：需要先激活“分享给好友” */
onShareTimeline((): Page.ShareTimelineContent => {
  return {
    title: '自定义分享标题',
    query: 'a=1&b=2',
  }
})
</script>

<style lang="scss" scoped>
//
</style>
