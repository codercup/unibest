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
    <button @click="getFoo" class="my-4" type="primary">测试 GET 请求</button>
    <view class="text-xl">请求数据如下</view>
    <view class="text-green h-10">{{ JSON.stringify(data) }}</view>
    <view class="text-xl">完整数据</view>
    <view class="text-green h-20">{{ JSON.stringify(originalData) }}</view>
    <button class="my-8" type="warn" @click="reset">一键清空数据</button>
  </view>
</template>

<script lang="ts" setup>
import { getMockAPI } from '@/service/mock'

onLoad(() => {
  getFoo()
})

const originalData = ref<IResData<any>>()
const data = ref()

const getFoo = async () => {
  const res = await getMockAPI('菲鸽')
  data.value = res.data
  originalData.value = res
}

const reset = () => {
  data.value = undefined
  originalData.value = undefined
}
</script>

<style lang="scss" scoped>
//
</style>
