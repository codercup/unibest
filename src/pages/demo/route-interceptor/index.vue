<route lang="json5" type="page">
{
  style: { navigationBarTitleText: '登陆拦截' },
}
</route>

<template>
  <view class="mt-8 text-center p-4">
    <view class="">登陆拦截的时候的登录有如下3种情况</view>
    <view class="">1.登录动作有单独的登录页面，需要通过重定向处理</view>
    <view class="">
      2.登录动作在当前页面通过弹窗登录，登录后需要更新登录状态（或者刷新本页面，体验没那么好）
    </view>
    <view class="">3.静默登录，小程序可以直接login，通常情况下都是登录状态的</view>
    <view class="leading-10">
      用户是否已登录：
      <text>{{ isLogined ? '是' : '否' }}</text>
    </view>
    <button v-if="!isLogined" @click="setUserInfo" class="mt-4" type="primary">登陆</button>
    <button v-else @click="clearUserInfo" class="mt-4" type="warn">登出</button>
    <button class="mt-8" @click="testAt">测试 Array.prototype.at</button>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'

const userStore = useUserStore()

const isLogined = computed(() => {
  return userStore.isLogined
})

const setUserInfo = () => {
  userStore.setUserInfo({ nickname: '菲鸽', avatar: '', token: 'abcdef' })
}
const clearUserInfo = () => {
  userStore.clearUserInfo()
}
const testAt = () => {
  console.log('Array.prototype.at typeof: ', typeof Array.prototype.at)
}
</script>

<style lang="scss" scoped>
//
</style>
