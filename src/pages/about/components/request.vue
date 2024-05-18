<route lang="json5">
{
  layout: 'demo',
  style: {
    navigationBarTitleText: '请求',
  },
}
</route>

<template>
  <view class="p-6 text-center">
    <view class="my-2">使用的是 laf 云后台</view>
    <view class="text-green-400">我的推荐码，可以获得佣金</view>

    <!-- #ifdef H5 -->
    <view class="my-2">
      <a class="my-2" :href="recommendUrl" target="_blank">{{ recommendUrl }}</a>
    </view>
    <!-- #endif -->

    <!-- #ifndef H5 -->
    <view class="my-2 text-left text-sm">{{ recommendUrl }}</view>
    <!-- #endif -->

    <!-- http://localhost:9000/#/pages/index/request -->
    <button @click="run" class="my-6">发送请求</button>
    <view class="text-xl">请求数据如下</view>
    <view class="text-green h-6">{{ JSON.stringify(data) }}</view>
    <button type="warn" @click="reset" class="my-6">清除数据</button>
  </view>
</template>

<script lang="ts" setup>
import { getFooAPI, postFooAPI, IFooItem } from '@/service/index/foo'

const recommendUrl = ref('http://laf.run/signup?code=ohaOgIX')

// 适合少部分全局性的接口————多个页面都需要的请求接口，额外编写一个 Service 层
const { loading, error, data, run } = useRequest<IFooItem>(() => getFooAPI('菲鸽'))
const reset = () => {
  data.value = undefined
}
</script>
