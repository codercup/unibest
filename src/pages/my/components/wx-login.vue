<route lang="json5">
{
  style: { navigationBarTitleText: '登录' },
}
</route>

<template>
  <view class="p-4">
    <view class="flex items-center leading-6" v-if="hasLogin">
      <image class="w-8 h-8 rounded-full" :src="userStore.userInfo?.avatar"></image>
      <view class="ml-2">{{ userStore.userInfo?.nickname }}</view>
    </view>
    <view class="flex items-center leading-6" v-else @click="show = true">
      <view class="i-carbon-user-avatar"></view>
      <view class="ml-2">点击显示微信头像</view>
    </view>
    <fly-login v-model="show" />
    <fly-content :line="10" />
    <button v-if="hasLogin" class="mt-2" @click="logout">退出登录</button>
  </view>
</template>

<script lang="ts" setup name="WxLogin">
import { useUserStore } from '@/store'

const show = ref(false)
const userStore = useUserStore()
const hasLogin = computed(() => userStore.userInfo?.nickname)
const logout = () => {
  uni.showModal({
    title: '确认退出当前账号？',
    success: (res) => {
      if (res.confirm) {
        userStore.clearUserInfo()
      }
    },
  })
}
</script>
