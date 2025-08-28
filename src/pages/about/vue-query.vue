<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { foo } from '@/api/foo'
import { getFooQueryOptions } from '@/api/foo-vue-query'

definePage({
  style: {
    navigationBarTitleText: 'Vue Query 演示',
  },
})

// 简单使用
onShow(async () => {
  const res = await foo()
  console.log('res: ', res)
})

// vue-query 版
const {
  data,
  error,
  isLoading: loading,
  refetch: send,
} = useQuery(getFooQueryOptions('菲鸽-vue-query'))
</script>

<template>
  <view class="p-6 text-center">
    <button type="primary" size="mini" class="my-6 w-160px" @click="send">
      发送请求
    </button>
    <view class="h-16">
      <view v-if="loading">
        loading...
      </view>
      <block v-else>
        <view class="text-xl">
          请求数据如下
        </view>
        <view class="text-green leading-8">
          {{ JSON.stringify(data) }}
        </view>
      </block>
    </view>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
