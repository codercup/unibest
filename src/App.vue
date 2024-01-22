<script setup lang="ts">
import { onLaunch, onShow, onHide, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})

// App.vue里面设置的微信分享对全部页面生效，TODO: 如何拿到每个页面的标题和url呢？

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
