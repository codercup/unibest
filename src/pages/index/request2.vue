<route lang="json5">
{
  layout: 'demo',
  style: {
    navigationBarTitleText: '请求-状态一体化',
  },
}
</route>

<template>
  <view class="p-6 text-center">
    <!-- http://localhost:9000/#/pages/index/request -->
    <button @click="getFoo" class="my-6">测试 GET 请求</button>
    <view class="text-xl">请求数据如下</view>
    <view v-if="loading" class="text-blue h-10">加载中...</view>
    <view v-if="error" class="text-red h-10">请求错误</view>
    <view v-else class="text-green h-10">{{ JSON.stringify(data) }}</view>
    <button class="my-6" type="warn" @click="reset">一键清空数据</button>
  </view>
</template>

<script lang="ts" setup>
import { getFooAPI2, IFooItem } from '@/service/index/foo'
import { httpGet } from '@/utils/http'

// 适合少部分全局性的接口————多个页面都需要的请求接口，额外编写一个 Service 层
const { loading, error, data, run } = useRequest<IFooItem>(() => getFooAPI2('菲鸽'))
// 再次简化，一行代码搞定，方便一次性的请求，适用大部分请求
// const { loading, error, data, run } = useRequest<IFooItem>(() => httpGet('/foo', { name: '菲鸽' }))

const getFoo = () => run()
const reset = () => {
  data.value = undefined
}
</script>
