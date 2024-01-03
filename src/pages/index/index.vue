<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <button @click="setUserInfo">设置UserInfo</button>
    <button @click="clearUserInfo">清除UserInfo</button>

    <button @click="handleRequest">请求</button>
    <view class="flex justify-center items-center text-blue-500">
      Demo Count: {{ countStore.count }}
      <button class="ml-2" @click="countStore.increment">新增</button>
    </view>
    <uni-icons type="contact" size="30" color="red"></uni-icons>
    <uni-badge text="1"></uni-badge>
    <!-- Sun in light mode, Moon in dark mode, from Carbon -->
    <button class="i-carbon-sun dark:i-carbon-moon text-green-300" />
    <fly-header></fly-header>
    <navigator url="/pages/test1/index" open-type="navigate" hover-class="navigator-hover">
      去二级页
    </navigator>
  </view>
</template>

<script setup lang="ts" name="TestIndex">
import { ref } from 'vue'
import { useCountStore, useUserStore } from '@/store'
import { http } from '@/utils/http'
import { UserItem } from '@/typings'
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'

const countStore = useCountStore()
const title = ref('Hello')

const uniLayout = ref()
console.log(uniLayout)

const userStore = useUserStore()

const setUserInfo = () => {
  userStore.setUserInfo({ username: 'fly', token: 'abcdef' })
}
const clearUserInfo = () => {
  userStore.clearUserInfo()
}
const handleRequest = () => {
  const res = http<UserItem[]>({
    url: '/getUserList',
    method: 'GET',
  })
  console.log(res)
}
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

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 200rpx;
  height: 200rpx;
  margin: 200rpx auto 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
