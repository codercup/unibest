<route lang="json5">
{
  style: { navigationBarTitleText: 'request请求+请求拦截' },
}
</route>

<template>
  <view>
    <button @click="handleRequest">请求</button>
  </view>
</template>
<script lang="ts" setup>
import { http } from '@/utils/http'
import { UserItem } from '@/typings'

const handleRequest = () => {
  const res = http<UserItem[]>({
    url: '/getUserList',
    method: 'GET',
  })
  console.log(res)
}
</script>
