<script lang="ts" setup>
import type { IFooItem } from '@/api/foo'
import { getFooAPI } from '@/api/foo'

const recommendUrl = ref('http://laf.run/signup?code=ohaOgIX')

// const initialData = {
//   name: 'initialData',
//   id: '1234',
// }
const initialData = undefined
const { loading, error, data, run } = useRequest<IFooItem>(() => getFooAPI('菲鸽'), {
  immediate: true,
  initialData,
})

function reset() {
  data.value = initialData
}
</script>

<template>
  <view class="p-6 text-center">
    <view class="my-2 text-center">
      <button type="primary" size="mini" class="w-160px" @click="run">
        发送请求
      </button>
    </view>
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
    <view class="my-6 text-center">
      <button type="warn" size="mini" class="w-160px" :disabled="!data" @click="reset">
        重置数据
      </button>
    </view>
  </view>
</template>
