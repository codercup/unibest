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
import { parseUrlToObj } from '@/utils/index'

const redirectUrl = ref('')
onLoad((options) => {
  console.log('login options: ', options)
  if (options.redirect) {
    redirectUrl.value = ensureDecodeURIComponent(options.redirect)
  }
  else {
    redirectUrl.value = tabbarList[0].pagePath
  }
  console.log('redirectUrl.value: ', redirectUrl.value)
})

const userStore = useUserStore()
function doLogin() {
  userStore.setUserInfo({
    id: '123456',
    username: '菲鸽',
    avatar: 'https://unibest.oss-cn-beijing.aliyuncs.com/avatar.png',
    token: 'fake-token',
  })
  console.log(redirectUrl.value)
  let path = redirectUrl.value
  if (!path.startsWith('/')) {
    path = `/${path}`
  }
  const { path: _path, query } = parseUrlToObj(path)
  console.log('_path:', _path, 'query:', query, 'path:', path)
  console.log('isPageTabbar(_path):', isPageTabbar(_path))
  if (isPageTabbar(_path)) {
    // 经过我的测试 switchTab 不能带 query 参数, 不管是放到 url  还是放到 query ,
    // 最后跳转过去的时候都会丢失 query 信息
    uni.switchTab({
      url: path,
    })
    // uni.switchTab({
    //   url: _path,
    //   query,
    // })
  }
  else {
    console.log('redirectTo:', path)
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
