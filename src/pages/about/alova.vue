<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: 'Alova 请求演示',
  },
}
</route>

<script lang="ts" setup>
import { useRequest } from 'alova/client'
import { foo } from '@/api/alova-foo'

const initialData = undefined
const { loading, data, send } = useRequest(foo, {
  initialData,
  immediate: true,
})
console.log(data)
function reset() {
  data.value = initialData
}
</script>

<template>
  <view class="p-6 text-center">
    <wd-button class="my-6" @click="send">
      发送请求
    </wd-button>
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
    <wd-button type="error" class="my-6" :disabled="!data" @click="reset">
      重置数据
    </wd-button>
  </view>
</template>

<style lang="scss" scoped>
//
</style>
