<script setup lang="ts">
// uniapp 页面生命周期
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'

import { useScroll } from '@/hooks/useScroll'

definePage({
  style: {
    navigationBarTitleText: '上拉刷新和下拉加载更多',
    enablePullDownRefresh: true,
    onReachBottomDistance: 100,
  },
})

// 模拟异步获取数据的函数
function mockFetchData(page: number, pageSize: number): Promise<{ id: number, name: string }[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (page > 5) {
        // 模拟没有更多数据
        resolve([])
        return
      }
      const data = Array.from({ length: pageSize }, (_, i) => ({
        id: (page - 1) * pageSize + i + 1,
        name: `item ${(page - 1) * pageSize + i + 1}`,
      }))
      resolve(data)
    }, 1000)
  })
}

const { list, loading, finished, error, refresh, loadMore } = useScroll({
  fetchData: mockFetchData,
  pageSize: 10,
})

onPullDownRefresh(async () => {
  console.log('onPullDownRefresh')
  console.log('onPullDownRefresh')
  console.log('onPullDownRefresh')
  await refresh()
  uni.stopPullDownRefresh()
})

onReachBottom(() => {
  loadMore()
})
</script>

<template>
  <view class="h-screen p-4">
    <view v-if="error" class="text-center text-red-500">
      加载失败，请重试
    </view>
    <view v-else>
      <view
        v-for="item in list"
        :key="item.id"
        class="my-2 h-20 flex items-center justify-center rounded bg-gray-100"
      >
        {{ item.name }}
      </view>
      <view v-if="loading" class="py-4 text-center text-gray-500">
        加载中...
      </view>
      <view v-if="finished" class="py-4 text-center text-gray-500">
        没有更多了
      </view>
    </view>
  </view>
</template>
