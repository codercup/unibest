<route lang="json5">
{
  layout: 'demo',
  style: { navigationBarTitleText: 'request请求+请求拦截' },
}
</route>

<template>
  <view>
    <button @click="handleRequest" type="primary" class="w-20">请求</button>
    <view class="mt-4">{{ result }}</view>
  </view>
</template>
<script lang="ts" setup>
import { http } from '@/utils/http'

const result = ref()
const handleRequest = async () => {
  const res = await http<string>({
    url: '/foo',
    method: 'GET',
  })
  console.log(res)
  result.value = res
}
</script>
