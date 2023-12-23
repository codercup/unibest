<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="flex justify-center items-center text-blue-500">
      Demo Count: {{ countStore.count }}
      <button class="ml-2" @click="countStore.increment">新增</button>
    </view>
    <Test />
  </view>
</template>

<script setup lang="ts" name="TestIndex">
import { ref } from 'vue'
import { useCountStore } from '@/store/count'
import Test from './Test.vue'

const countStore = useCountStore()
const title = ref('Hello')

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
console.log(safeAreaInsets)
const rect = {
  top: `${safeAreaInsets.top}px`,
  bottom: `${safeAreaInsets.bottom}px`,
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: v-bind('rect.top');
}

.logo {
  width: 200rpx;
  height: 200rpx;
  margin: 200rpx auto 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
