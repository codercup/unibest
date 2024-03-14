<route lang="json5" type="page">
{
  style: { navigationBarTitleText: '路由拦截-before' },
}
</route>

<template>
  <view class="mt-8 text-center">
    <uv-button type="primary" @click="gotoPage"> 跳转 </uv-button>
  </view>
</template>

<script lang="ts" setup>
const gotoPage = () => {
  uni.redirectTo({ url: '/pages/route-interceptor/index?name=feige&age=30' })
}
</script>

<style lang="scss" scoped>
//
</style>
