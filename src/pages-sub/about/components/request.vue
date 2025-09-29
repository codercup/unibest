<script lang="ts" setup>
import type { IFooItem } from '@/api/foo'
import { getFooAPI } from '@/api/foo'

// const initialData = {
//   name: 'initialData',
//   id: '1234',
// }
const initialData = undefined

// 直接请求示例
async function reqFooAPI() {
  try {
    const res = await getFooAPI('菲鸽')
    console.log('直接请求示例res', res)
  }
  catch (err) {
    console.log(err)
  }
}
reqFooAPI()

// 直接useRequest请求示例
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
    <view class="my-2">
      pages 里面的 vue 文件会扫描成页面，将自动添加到 pages.json 里面。
    </view>
    <view class="my-2 text-green-400">
      但是 pages/components 里面的 vue 不会。
    </view>

    <view class="my-4 text-center">
      <button type="primary" size="mini" class="w-160px" @click="run">
        发送请求
      </button>
    </view>
    <view class="h-16">
      <view v-if="loading">
        loading...
      </view>
      <block v-else>
        <view v-if="error instanceof Error" class="text-red leading-8">
          错误: {{ error.message }}
        </view>
        <view v-else-if="error" class="text-red leading-8">
          错误: 未知错误
        </view>
        <view v-else>
          <view class="text-xl">
            请求数据如下
          </view>
          <view class="text-green leading-8">
            {{ JSON.stringify(data) }}
          </view>
        </view>
      </block>
    </view>
    <view class="my-4 text-center">
      <button type="warn" size="mini" class="w-160px" :disabled="!data" @click="reset">
        重置数据
      </button>
    </view>
  </view>
</template>
