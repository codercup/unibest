<route lang="json5">
{
  style: {
    navigationBarTitleText: '关于',
  },
}
</route>

<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <view class="text-center text-3xl mt-4">关于页面</view>
    <view class="text-center text-3xl mt-8">
      鸽友们好，我是
      <text class="text-red-500">菲鸽</text>
    </view>
    <view class="text-center mt-8">
      <wd-button type="primary" @click="gotoPage('request')">去请求页</wd-button>
    </view>

    <view class="text-center py-4">
      当前平台是：
      <text class="text-red-500">{{ PLATFORM.platform }}</text>
    </view>
    <view class="text-center desc mt-10">设计稿样式编写：</view>
    <view class="text-center desc">设计稿是750px，css里面全部写rpx 即可</view>
  </view>
  <tabbar />
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

console.log(PLATFORM)

const gotoPage = (page: string) => {
  uni.navigateTo({
    url: `/pages/index/${page}`,
  })
}
</script>

<style lang="scss" scoped>
.desc {
  height: 80rpx;
}
</style>
