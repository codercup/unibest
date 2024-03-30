<route lang="json5" type="page">
{
  needLogin: true,
  style: { navigationBarTitleText: '登陆拦截 - 登陆页面' },
}
</route>

<template>
  <view class="mt-8 text-center p-4">
    <view class="leading-10">
      用户是否已登录：
      <text>{{ isLogined ? '是' : '否' }}</text>
    </view>
    <view class="text-gray">未登录不能来本页面</view>
    <view class="text-gray">已登录才能来本页面</view>
    <view class="text-gray">增加微信分享功能，方便测试路由拦截</view>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { getLastItem } from '@/utils'

const userStore = useUserStore()
const pages = getCurrentPages()
console.log('pages:', pages)

const isLogined = computed(() => {
  console.log('userStore=>', userStore)
  const pages = getCurrentPages()
  console.log('pages:', pages)
  return userStore.isLogined
})

// TODO Check
const loginRoute = '/pages/login/index'

onLoad((opt) => {
  console.log('onLoad', isLogined.value, opt)
})
onReady(() => {
  const pages = getCurrentPages()
  const lastPage = getLastItem(pages)
  console.log('route-interception.vue onReady last page:', isLogined.value, lastPage)
  const currRoute = (lastPage as any).$page
  console.log('route-interception.vue onReady currRoute:', currRoute)
  if (!isLogined.value) {
    // redirect时都需要 encodeURIComponent 一下，否则获取到的参数不对
    const redirectRoute = `${loginRoute}?redirect=${encodeURIComponent(currRoute.fullPath)}`
    uni.redirectTo({ url: redirectRoute })
  }
})

/** 激活“分享给好友” */
onShareAppMessage((options: Page.ShareAppMessageOption): Page.CustomShareContent => {
  console.log('options:', options)
  return {
    title: 'unibest 路由拦截、进入指定页面',
    desc: 'unibest 演示示例',
    // path: '/pages/demo/base/route-middleware?redirect=/pages/demo/base/route-interceptor?a=1&b=2',
    path: 'pages/route-interceptor/index?name=feige&age=30&sex=male',
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
