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
    <!-- http://localhost:9100/#/pages/index/request -->
    <button @click="getFoo" class="my-4">测试 GET 请求</button>
    <view class="text-xl">请求数据如下</view>
    <view class="text-green h-20">{{ loading ? '加载中' : JSON.stringify(data) }}</view>
    <button @click="postFoo" class="my-4">测试 POST 请求</button>
    <view class="text-xl">请求数据如下</view>
    <view class="text-green h-20">{{ loading2 ? '加载中' : JSON.stringify(data2) }}</view>

    <button class="my-8" type="warn" @click="reset">一键清空数据</button>

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
import { getFooAPI, postFooAPI } from '@/service/foo'
import { useRequest } from 'alova'

const recommendUrl = ref('http://laf.run/signup?code=ohaOgIX')

const {
  data,
  loading,
  update,
  send: getFoo,
} = useRequest(getFooAPI, {
  force: true,
})

const {
  data: data2,
  loading: loading2,
  update: update2,
  send: postFoo,
} = useRequest(() =>
  postFooAPI({
    name: `菲鸽${Date.now()}`,
    phone: '124',
  }),
)

const reset = () => {
  update({
    data: undefined,
  })
  update2({
    data: undefined,
  })
}
</script>
