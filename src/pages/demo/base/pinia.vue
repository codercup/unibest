<route lang="json5">
{
  layout: 'demo',
  style: { navigationBarTitleText: 'pinia+持久化' },
}
</route>

<template>
  <view class="flex justify-center items-center text-blue-500 mt-4 mb-4">
    <view class="w-20">Count: {{ countStore.count }}</view>
    <button class="ml-2 mr-2" @click="countStore.decrement">-1</button>
    <button class="ml-2 mr-2" @click="countStore.increment">+1</button>
    <button class="ml-2 mr-2" @click="countStore.reset">重置</button>
  </view>
  <view class="m-8 text-4 leading-8">
    <view class="text-center">{{ userStore.userInfo }}</view>
    <view class="text-center">请观察小程序的store，可以看到是可以正常设置的</view>
    <button @click="setUserInfo">设置UserInfo</button>
    <button @click="clearUserInfo" class="mt-4">清除UserInfo</button>
    <button @click="resetUserStore" class="mt-4">reset UserStore</button>
  </view>
</template>

<script lang="ts" setup>
import { useCountStore, useUserStore } from '@/store'

const countStore = useCountStore()

const userStore = useUserStore()

const setUserInfo = () => {
  userStore.setUserInfo({ nickname: '菲鸽', avatar: '', token: 'abcdef' })
}
const clearUserInfo = () => {
  userStore.clearUserInfo()
}
const resetUserStore = () => {
  userStore.reset()
}
</script>
