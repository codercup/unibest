<route lang="json5">
{
  style: { navigationBarTitleText: '我的' },
}
</route>
<template>
  <view>我的</view>
  <view>wx的openid:{{ openId }} </view>
  <view @click="goLoginPage">去登录</view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'
import { http } from '@/utils/http'

const userStore = useUserStore()

const openId = ref('')
const goLoginPage = () => {
  uni.navigateTo({ url: '/pages/login/index' })
}

// 用户登录，获取openId
uni.login({
  provider: 'weixin',
  success: async ({ code }) => {
    const res = await http<{ session_key: string; openid: string }>({
      method: 'GET',
      url: '/weixin/jscode2session',
      data: {
        code,
      },
    })
    openId.value = res.result.openid
    userStore.setUserInfo({ nickname: '微信用户', avatar: '', openid: res.result.openid })
  },
})
</script>
