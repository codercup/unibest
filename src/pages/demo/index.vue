<template>
  <view class="bg-slate-100">
    <view class="bg-slate-100 w-full">
      <view class="font-800 mt-4">基本功能</view>
      <view v-for="item in baseDemos" :key="item.path" class="mt-3">
        <view
          class="flex bg-white items-center justify-between p-3 mb-2"
          @click="goDetailPage(item.path)"
        >
          <text class="flex-1 text-4 text-dark">{{ item.title }}</text>
          <text class="i-carbon-chevron-right"></text>
        </view>
      </view>
    </view>
    <view class="bg-slate-100 w-full">
      <view class="font-800 mt-4">页面功能</view>
      <view v-for="item in pageDemos" :key="item.path" class="mt-3">
        <view
          class="flex bg-white items-center justify-between p-3 mb-2"
          @click="goDetailPage(item.path)"
        >
          <text class="flex-1 text-4 text-dark">{{ item.title }}</text>
          <text class="i-carbon-chevron-right"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts" name="TestIndex">
import pagesJson from '@/pages.json'

console.log(pagesJson)
/** 基本功能 */
const baseDemos = pagesJson.pages
  .filter((e) => e.path.startsWith('pages/demo/base'))
  .map((e) => ({
    title: e.style?.navigationBarTitleText || '默认页面标题',
    path: e.path,
  }))
/** 页面功能 */
const pageDemos = pagesJson.pages
  .filter((e) => e.path.startsWith('pages/demo/page'))
  .map((e) => ({
    title: e.style?.navigationBarTitleText || '默认页面标题',
    path: e.path,
  }))

const goDetailPage = (path: string) => {
  const url = `/${path}`
  uni.navigateTo({
    url,
  })
}
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
