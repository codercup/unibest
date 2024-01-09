<route lang="json5">
{
  style: { navigationBarTitleText: '微信分享' },
}
</route>

<template>
  <view class="m-10 text-center">
    <view class="text-8">微信分享页</view>
    <view class="text-6">请在微信小程序中打开</view>
  </view>
</template>

<script lang="ts" setup>
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
/** 激活“分享给好友” */
onShareAppMessage((options: Page.ShareAppMessageOption): Page.CustomShareContent => {
  console.log('options:', options)
  return {
    title: '自定义分享标题',
    path: '/pages/index/index?id=xxx',
    imageUrl:
      'https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/pretty-girl.png',
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
