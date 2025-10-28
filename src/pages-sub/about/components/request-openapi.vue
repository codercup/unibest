<script lang="ts" setup>
import type { InfoUsingGetResponse } from '@/service'
import { infoUsingGet, listAllUsingGet } from '@/service'

const loading = ref(false)
const error = ref<Error | null>(null)
const userInfo = ref<InfoUsingGetResponse>()

// openapi 请求示例
async function getUserInfo() {
  try {
    loading.value = true
    const res = await infoUsingGet({})
    console.log(res)
    userInfo.value = res
    error.value = null
  }
  catch (err) {
    error.value = err as Error
    userInfo.value = null
  }
  finally {
    loading.value = false
  }
}

// openapi + useRequest 请求示例
const { data: userList, loading: loading2, run } = useRequest(() => listAllUsingGet({}), {
  immediate: false,
})
</script>

<template>
  <view class="p-6 text-center">
    <view class="my-4 text-center">
      1)直接使用 openapi 生成的请求
    </view>
    <view class="my-4 text-center">
      <button type="primary" size="mini" class="w-160px" @click="getUserInfo">
        发送请求
      </button>
      <view class="text-xl">
        请求数据如下
      </view>
      <view class="text-green leading-8">
        {{ JSON.stringify(userInfo) }}
      </view>
    </view>
    <view class="my-4 text-center">
      2)直接使用 openapi + useRequest 生成的请求
    </view>
    <view class="my-4 flex items-center gap-2 text-center">
      <button type="primary" size="mini" class="w-160px" @click="run">
        发送请求
      </button>
    </view>
    <view class="text-xl">
      请求数据如下
    </view>
    <view class="text-green leading-8">
      {{ JSON.stringify(userList) }}
    </view>
  </view>
</template>
