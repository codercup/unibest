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
  </view>
</template>

<script setup lang="ts" name="TestIndex">
import { ref } from 'vue'
import { useCountStore } from '@/store/count'
import { fun, fun as yy } from '../../test/import-sort'

const countStore = useCountStore()

uni.showModal({
  title: '提示',
  content: '这是一个模态弹窗',
  success(res) {
    if (res.confirm) {
      console.log('用户点击确定')
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  },
})
const title = ref('Hello')
fun()
yy()
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
