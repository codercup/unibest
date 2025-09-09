<script lang="ts" setup>
import { useTokenStore } from '@/store/token'
import { useUserStore } from '@/store/user'
import { tabbarList } from '@/tabbar/config'
import { isPageTabbar } from '@/tabbar/store'
import { ensureDecodeURIComponent } from '@/utils'
import { parseUrlToObj } from '@/utils/index'

definePage({
  style: {
    navigationBarTitleText: '登录',
  },
})

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
const tokenStore = useTokenStore()
async function doLogin() {
  if (tokenStore.hasLogin) {
    uni.navigateBack()
    return
  }
  try {
    // 有的时候后端会用一个接口返回token和用户信息，有的时候会分开2个接口（各有利弊，看业务场景和系统复杂度），这里使用2个接口返回的来模拟
    // 1/2 调用接口回来后设置token信息
    // 这里用单token来模拟
    tokenStore.setTokenInfo({
      token: '123456',
      expiresIn: 60 * 60 * 24 * 7,
    })

    // 2/2 调用接口回来后设置用户信息
    // const res = await login({
    //   username: '菲鸽',
    //   password: '123456',
    // })
    // console.log('接口拿到的登录信息：', res)
    userStore.setUserInfo({
      userId: 123456,
      username: 'abc123456',
      nickname: '菲鸽',
      avatar: 'https://oss.laf.run/ukw0y1-site/avatar.jpg',
    })

    console.log(redirectUrl.value)
  }
  catch (error) {
    console.log('登录失败', error)
  }
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
    <!-- 本页面是非MP的登录页，主要用于 h5 和 APP -->
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
