<template>
  <!-- 自定义导航栏: 默认透明不可见, scroll-view 滚动到 50 时展示 -->
  <view class="fly-navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <navigator v-if="pages.length > 1" open-type="navigateBack" class="back">
      <uni-icons type="left" color="white" size="24" />
    </navigator>
    <navigator v-else open-type="switchTab" url="/pages/index/index" class="back">
      <uni-icons type="home" color="white" size="24" />
    </navigator>
    <view class="title">{{ title || '' }}</view>
  </view>
</template>

<script lang="ts" setup>
defineProps<{ title?: string }>()
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
// 获取页面栈
const pages = getCurrentPages()
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

  .back {
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
