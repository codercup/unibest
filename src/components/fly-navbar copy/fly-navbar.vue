<template>
  <!-- 自定义导航栏: 默认透明不可见, scroll-view 滚动到 50 时展示 -->
  <view class="fly-navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <!-- 1/3，多于1个页面，用返回图标 -->
    <navigator v-if="pages.length > 1" open-type="navigateBack" class="left-icon">
      <view class="bg-gray-500/80 rounded-full w-8 h-8 flex items-center justify-center">
        <button class="i-carbon-chevron-left text-white w-7 h-7"></button>
      </view>
    </navigator>
    <!-- 2/3，只有1个页面，如果不是tabbar，需要首页图标 -->
    <!-- 这种情况一般出现在用户直接打开分享出去的详情页面，或者使用redirectTo等API -->
    <navigator
      v-else-if="!isTabbar"
      open-type="switchTab"
      url="/pages/index/index"
      class="left-icon"
    >
      <view class="bg-gray-500/80 rounded-full w-8 h-8 flex items-center justify-center">
        <button class="i-carbon-home text-white w-6 h-6"></button>
      </view>
    </navigator>
    <!-- 3/3，如果当前页就是tabbar页，不用去首页，也就是什么图标都不需要 -->
    <view class="title">{{ title || '' }}</view>
  </view>
</template>

<script lang="ts" setup>
import { getIsTabbar } from '@/utils/index'

defineProps<{ title?: string }>()
// 获取页面栈
const pages = getCurrentPages()
const isTabbar = getIsTabbar()
console.log({ isTabbar, pagesLen: pages.length })

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<style lang="scss" scoped>
.fly-navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 750rpx;
  color: #000;
  background-color: transparent;

  .left-icon {
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    font-size: 44rpx;
    color: #000;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    font-size: 32rpx;
    color: transparent;
  }
}
</style>
