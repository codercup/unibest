<route lang="json5" type="page">
{
  style: { navigationBarTitleText: '登录' },
}
</route>

<template>
  <view class="">登录页面</view>
  <view class="">登录成功后会跳转回拦截前的页面</view>
  <uv-button type="primary" @click="login">登录</uv-button>
</template>

<script lang="ts" setup>
import { currRoute } from '@/utils'

import { useUserStore } from '@/store'

const userStore = useUserStore()
const login = () => {
  userStore.setUserInfo({ nickname: '菲鸽', avatar: '', token: 'abcdef' })
  const { redirectPath } = currRoute()
  uni.redirectTo({ url: redirectPath })
}
</script>

<style lang="scss" scoped>
//
</style>
