<template>
  <fly-navbar title="导航栏标题" />
  <scroll-view
    enable-back-to-top
    scroll-y
    class="bg-zinc-100"
    id="scroller"
    @scrolltolower="onScrollToLower"
  >
    <view class="top-section" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <view class="pt-1">顶部区域</view>
      <view>可以是标题，也可以是个人中心头像等</view>
      <view>建议本区域高度不低于200rpx</view>
    </view>
    <fly-content :line="30" />
  </scroll-view>
</template>

<script lang="ts" setup>
// 页面滚动到底部时的操作，通常用于加载更多数据
const onScrollToLower = () => {}
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<style lang="scss">
// 这个区域最好要大于200rpx，效果会更好
.top-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200rpx;
  padding: 40rpx 0;
  line-height: 2;
  color: #fff;
  background-image: url('https://cip-shopping-page-0eysug01066a9e-1302818703.tcloudbaseapp.com/fly/top-bg.png');
  background-size: cover;
}
</style>
