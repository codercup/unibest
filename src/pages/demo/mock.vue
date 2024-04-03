<route lang="json5" type="page">
{
  layout: 'demo',
  style: {
    navigationBarTitleText: 'mock',
  },
}
</route>

<template>
  <view class="mt-6">
    <button @click="send" class="my-4" type="primary">测试 GET 请求</button>
    <view class="text-xl">请求数据如下</view>
    <view class="text-green h-10">{{ loading ? '加载中' : JSON.stringify(data) }}</view>
    <button class="my-8" type="warn" @click="reset">一键清空数据</button>
  </view>
</template>

<script lang="ts" setup>
import { getMockAPI } from '@/service/mock'
import { useRequest } from 'alova'

const { data, update, send, loading } = useRequest(getMockAPI)

const reset = () => {
  update({
    data: undefined,
  })
}
</script>
