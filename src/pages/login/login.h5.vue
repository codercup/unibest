<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "登录"
  }
}
</route>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import { tabbarList } from '@/tabbar/config'
import { isPageTabbar } from '@/tabbar/store'

const redirectUrl = ref('')
onLoad((options) => {
  console.log('login options', options)
  redirectUrl.value = options.redirectUrl || tabbarList[0].pagePath
})
const userStore = useUserStore()
function doLogin() {
  userStore.setUserInfo({
    id: 1,
    username: '菲鸽',
    avatar: 'https://unibest.oss-cn-beijing.aliyuncs.com/avatar.png',
    token: 'fake-token',
  })
  console.log(redirectUrl.value)
  if (isPageTabbar(redirectUrl.value)) {
    uni.switchTab({
      url: `/${redirectUrl.value}`,
    })
  }
  else {
    uni.redirectTo({
      url: `/${redirectUrl.value}`,
    })
  }
}
</script>

<template>
  <view class="login">
    <view class="login__header">
      <view class="login__header__title">
        登录 h5
      </view>
      <button class="mt-4 w-40 text-center" @click="doLogin">
        点击模拟登录
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
