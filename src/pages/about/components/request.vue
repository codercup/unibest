<script lang="ts" setup>
import type { IFooItem } from '@/service/index/foo'
import { getFooAPI } from '@/service/index/foo'
// import { findPetsByStatusQueryOptions } from '@/service/app'
// import { useQuery } from '@tanstack/vue-query'

const recommendUrl = ref('http://laf.run/signup?code=ohaOgIX')

// const initialData = {
//   name: 'initialData',
//   id: '1234',
// }
const initialData = undefined
// 适合少部分全局性的接口————多个页面都需要的请求接口，额外编写一个 Service 层
const { loading, error, data, run } = useRequest<IFooItem>(() => getFooAPI('菲鸽'), {
  immediate: true,
  initialData,
})

// 使用 vue-query 的 useQuery 来请求数据，只做参考，是否使用请根据实际情况而定
// const {
//   data: data2,
//   error: error2,
//   isLoading: isLoading2,
//   refetch,
// } = useQuery(findPetsByStatusQueryOptions({ params: { status: ['available'] } }))

function reset() {
  data.value = initialData
}
</script>

<template>
  <view class="p-6 text-center">
    <view class="my-2">
      使用的是 laf 云后台
    </view>
    <view class="text-green-400">
      我的推荐码，可以获得佣金
    </view>

    <!-- #ifdef H5 -->
    <view class="my-2">
      <a class="my-2" :href="recommendUrl" target="_blank">{{ recommendUrl }}</a>
    </view>
    <!-- #endif -->

    <!-- #ifndef H5 -->
    <view class="my-2 text-left text-sm">
      {{ recommendUrl }}
    </view>
    <!-- #endif -->

    <!-- http://localhost:9000/#/pages/index/request -->
    <wd-button class="my-6" @click="run">
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
