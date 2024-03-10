<route lang="json5" type="page">
{
  style: { navigationBarTitleText: '登录' },
}
</route>

<template>
  <view class="text-center">
    <view class="leading-10">登录成功后会跳转回拦截前的页面</view>
    <view class="p-10">
      <uv-button type="primary" @click="login">登录</uv-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { currRoute } from '@/utils'

import { useUserStore } from '@/store'

const userStore = useUserStore()
const login = () => {
  userStore.setUserInfo({ nickname: '菲鸽', avatar: '', token: 'abcdef' })
  const { query } = currRoute()
  uni.redirectTo({ url: query.redirect })
}

onLoad((opt) => {
  console.log('login onLoad', opt)
})
</script>

<style lang="scss" scoped>
//
</style>
