<route lang="json5" type="page">
{
  style: { navigationBarTitleText: '登陆拦截 - 登陆弹窗' },
}
</route>

<template>
  <view class="mt-8 text-center p-4">
    <view class="leading-10">
      用户是否已登录：
      <text>{{ isLogined ? '是' : '否' }}</text>
    </view>
    <view>这里有一个按钮（比如点赞按钮），点击这个按钮需要先登录</view>
    <button type="primary" @tap="onClick" class="mt-4">点赞菲鸽</button>
    <uv-modal
      ref="modal"
      title="登陆"
      content="模拟登陆，点击确认按钮即可"
      @confirm="confirmLogin"
    ></uv-modal>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'

const userStore = useUserStore()
const pages = getCurrentPages()
console.log('pages:', pages)

const modal = ref()

const isLogined = computed(() => {
  console.log('userStore=>', userStore)
  const pages = getCurrentPages()
  console.log('pages:', pages)
  return userStore.isLogined
})

const confirmLogin = () => {
  userStore.setUserInfo({ nickname: '菲鸽', avatar: '', token: 'abcdef' })
  onClick() // 补偿机制，比较友好。当然，也可以让用户重新点击一下。
  modal.value?.close()
}
const onClick = () => {
  if (isLogined.value) {
    console.log('用户已登录，可以点赞')
    uni.showToast({ title: '点赞成功' })
    // 这里执行接口请求
    return
  }
  modal.value?.open()
}

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
