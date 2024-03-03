<route lang="json5">
{
  layout: 'demo',
  style: { navigationBarTitleText: '微信分享' },
}
</route>

<template>
  <view class="text-green">微信分享页</view>
  <view class="text-green-500">请在微信小程序中体验，或者开发者工具</view>
  <view>1) 默认是不激活”发送给朋友“和”分享到朋友圈“的，如下图</view>
  <image
    src="https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/wx-share/wx-share-before.png"
    mode="widthFix"
  />
  <view>2) 增加了onShareAppMessage和onShareTimeline后，就可以微信分享了，如下图</view>
  <image
    src="https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/wx-share/wx-share-after.png"
    mode="widthFix"
  />
</template>

<script lang="ts" setup>
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
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
