<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: 'alova',
  },
}
</route>

<template>
  <view class="center">
    <view v-if="loading">加载中...</view>
    <view>请求数据为：{{ data }}</view>
  </view>
</template>

<script lang="ts" setup>
import { alovaInst } from '@/utils/alova'
import { useRequest } from 'alova'

const list = () =>
  alovaInst.Get('/list', {
    // 设置的参数将传递给uni.request
    enableHttp2: true,
    sslVerify: true,
  })
const { loading, data } = useRequest(list)
</script>

<style lang="scss" scoped>
//
</style>
