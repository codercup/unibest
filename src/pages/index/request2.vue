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
    <!-- http://localhost:9000/#/pages/index/request -->
    <button @click="getFoo" class="my-6">测试 GET 请求</button>
    <view class="text-xl">请求数据如下</view>
    <view v-if="loading" class="text-blue h-10">加载中...</view>
    <view v-else class="text-green h-10">{{ JSON.stringify(data) }}</view>
    <button class="my-6" type="warn" @click="reset">一键清空数据</button>
  </view>
</template>

<script lang="ts" setup>
import { getFooAPI, IFooItem } from '@/service/index/foo'

const { loading, data, run } = useRequest<IFooItem>(() => getFooAPI('菲鸽'), { immediate: true })

const getFoo = () => run()
const reset = () => {
  data.value = undefined
}
</script>
