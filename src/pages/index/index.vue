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
    <!-- Sun in light mode, Moon in dark mode, from Carbon -->
    <button class="i-carbon-sun dark:i-carbon-moon" />
  </view>
</template>

<route lang="json">
{
  "layout": "home",
  "style": {
    "navigationBarTitleText": "我才是标题"
  }
}
</route>

<script setup lang="ts" name="TestIndex">
import { ref } from 'vue'
import { useCountStore, useUserStore } from '@/store'
import { http } from '@/utils/http'
import { UserItem } from '@/typings'

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
