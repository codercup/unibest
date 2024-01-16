<route lang="json5">
{
  style: { navigationBarTitleText: '我的' },
}
</route>
<template>
  <view>我的</view>
  <view @click="goLoginPage">去登录</view>
</template>

<script lang="ts" setup>
const goLoginPage = () => {
  uni.navigateTo({ url: '/pages/login/index' })
}
// 用户登录，获取openId
</script>
