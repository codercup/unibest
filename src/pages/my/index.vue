<template>
  <view class="fly-navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <!-- 1/3，多于1个页面，用返回图标 -->
    <navigator v-if="pages.length > 1" open-type="navigateBack" class="left-icon">
      <button class="i-carbon-chevron-left text-current"></button>
    </navigator>
    <!-- 2/3，只有1个页面，如果不是tabbar，需要首页图标 -->
    <!-- 这种情况一般出现在用户直接打开分享出去的详情页面，或者使用redirectTo等API -->
    <navigator
      v-else-if="!isTabbar"
      open-type="switchTab"
      url="/pages/index/index"
      class="left-icon"
    >
      <button class="i-carbon-home text-current"></button>
    </navigator>
    <!-- 3/3，如果当前页就是tabbar页，不用去首页，也就是什么图标都不需要 -->
    <view class="title">{{ '我是标题' }}</view>
  </view>
  <scroll-view
    enable-back-to-top
    scroll-y
    class="bg-white flex-1 h-full"
    id="scroller"
    @scrolltolower="onScrollToLower"
  >
    <view class="top-section" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <view class="pt-1">顶部区域</view>
      <view>可以是标题，也可以是个人中心头像等</view>
      <view>建议本区域高度不低于200rpx</view>
    </view>
    <view class="p-2 leading-6">
      注意，上面的导航栏渐变效果仅微信端支持，且上面的导航栏无法抽为组件引入使用，否则滚动效果没有了。如果不只是微信小程序使用，可以
      onPageScroll 实现全端效果一样，另外如果是app端，还可以配置 titleNView。参考
      https://uniapp.dcloud.net.cn/tutorial/page.html#onpagescroll 。
    </view>
    <fly-content :line="30" />
  </scroll-view>
</template>

<script lang="ts" setup>
import useNavbarWeixin from '@/hooks/useNavbarWeixin'

const { pages, isTabbar, onScrollToLower, safeAreaInsets } = useNavbarWeixin()
</script>

<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

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
