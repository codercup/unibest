<route lang="json5">
{
  layout: 'demo',
  style: {
    navigationBarTitleText: '请求',
  },
}
</route>

<template>
  <view class="mt-6">
    <!-- http://localhost:9000/#/pages/index/request -->
    <button @click="testRequest" class="my-4">测试 GET 请求</button>
    <view class="text-xl">请求数据如下</view>
    <view class="text-green h-10">{{ JSON.stringify(data) }}</view>
    <button @click="testRequest2" class="my-4">测试 POST 请求</button>
    <view class="text-xl">请求数据如下</view>
    <view class="text-green h-10">{{ JSON.stringify(data2) }}</view>
  </view>
</template>

<script lang="ts" setup>
import { getFoo, postFoo, FooItem } from '@/service/foo'

const data = ref<FooItem>()
const testRequest = async () => {
  const res = await getFoo('菲鸽')
  data.value = res.result
}

const data2 = ref<FooItem>()
const testRequest2 = async () => {
  const res = await postFoo('菲鸽2')
  data2.value = res.result
}
</script>
