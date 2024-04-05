<route lang="json5">
{
  style: { navigationBarTitleText: '我的' },
}
</route>
<template>
  <view class="ml-4">wx的openid:</view>
  <view class="ml-4">{{ openId }}</view>
  <wx-login />
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'
import { http } from '@/utils/http'
import WxLogin from './components/wx-login.vue'

const userStore = useUserStore()
const openId = ref('')

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
    console.log('微信登录-1：', res)
    // {code: 0, msg: "success", data: {session_key: "JTzhLVK+oM3X58uJ/heDcQ==", openid: "oSYa06xPVqjsK-eFYzt0kSPYu1q4"}}
    openId.value = res.data.openid
    userStore.setUserInfo({ openid: res.data.openid })
  },
})
</script>
