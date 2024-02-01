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

    <view class="my-2">使用的是 laf 云后台</view>
    <view class="text-green-400">我的推荐码，可以获得佣金</view>
    <!-- #ifdef H5 -->
    <view class="my-2 text-center">
      <a class="my-2 text-center" :href="recommendUrl" target="_blank">{{ recommendUrl }}</a>
    </view>
    <!-- #endif -->

    <!-- #ifndef H5 -->
    <view class="my-2 text-left text-sm">{{ recommendUrl }}</view>
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
import { getFoo, postFoo, IFooItem } from '@/service/foo'

const recommendUrl = ref('http://laf.run/signup?code=ohaOgIX')

onLoad(() => {
  testRequest()
  testRequest2()
})

const data = ref<IFooItem>()
const testRequest = async () => {
  const res = await getFoo('菲鸽')
  data.value = res.result
}

const data2 = ref<IFooItem>()
const testRequest2 = async () => {
  const res = await postFoo('菲鸽2')
  data2.value = res.result
}
</script>
