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
import { ensureDecodeURIComponent } from '@/utils'

const redirectUrl = ref('')
onLoad((options) => {
  console.log('login options', options)
  if (options.redirect) {
    redirectUrl.value = ensureDecodeURIComponent(options.redirect)
  }
  else {
    redirectUrl.value = tabbarList[0].pagePath
  }
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
  let path = redirectUrl.value
  if (!path.startsWith('/')) {
    path = `/${path}`
  }
  console.log('path:', path)
  if (isPageTabbar(path)) {
    uni.switchTab({
      url: path,
    })
  }
  else {
    uni.redirectTo({
      url: path,
    })
  }
}
</script>

<template>
  <view class="login">
    <view class="text-center">
      登录页
    </view>
    <button class="mt-4 w-40 text-center" @click="doLogin">
      点击模拟登录
    </button>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
