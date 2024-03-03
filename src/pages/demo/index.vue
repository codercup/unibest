<route lang="json5">
{
  style: { navigationBarTitleText: 'unibest 示例' },
}
</route>

<template>
  <view class="bg-slate-100 p-4">
    <view class="bg-slate-100 w-full" v-for="item in listData" :key="item.id">
      <view class="font-800">{{ item.title }}</view>
      <view v-for="itemDetail in item.list" :key="itemDetail.path" class="mt-3">
        <view
          class="flex bg-white items-center justify-between p-3 mb-2"
          @click="goDetailPage(itemDetail.path)"
        >
          <text class="flex-1 text-4 text-dark">{{ itemDetail.title }}</text>
          <text class="i-carbon-chevron-right"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts" name="TestIndex">
import pagesJson from '@/pages.json'

const handleTitle = (str?: string) => {
  if (!str) {
    return '标题'
  }
  if (/%.*%/.test(str)) {
    return '多语言'
  }
  return str
}
/** 基本功能 */
const baseDemos = pagesJson.pages
  .filter((e) => e.path.startsWith('pages/demo/base'))
  .map((e) => ({
    title: handleTitle(e.style?.navigationBarTitleText),
    path: e.path,
  }))

/** 页面功能 */
const pageDemos = pagesJson.pages
  .filter((e) => e.path.startsWith('pages/demo/page'))
  .map((e) => ({
    title: handleTitle(e.style?.navigationBarTitleText),
    path: e.path,
  }))

const listData = reactive([
  {
    id: 1,
    title: '基础功能',
    list: baseDemos,
  },
  {
    id: 2,
    title: '页面功能',
    list: pageDemos,
  },
])

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
