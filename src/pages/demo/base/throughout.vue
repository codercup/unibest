<route lang="json5">
{
  style: {
    navigationBarTitleText: '通屏+下拉刷新+自定义导航栏',
    enablePullDownRefresh: false,
    backgroundColor: '#23c09c', // 这个背景色要与页面的.top-section的背景图差不多，这样下拉刷新看起来才比较协调
    'app-plus': {
      titleNView: {
        type: 'transparent',
      },
    },
    'mp-weixin': {
      navigationStyle: 'custom',
    },
  },
}
</route>

<template>
  <!-- #ifdef MP-WEIXIN -->
  <view class="fly-navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <!-- 1/3，多于1个页面，用返回图标 -->
    <navigator v-if="pages.length > 1" open-type="navigateBack" class="left-icon">
      <view class="i-carbon-chevron-left text-current"></view>
    </navigator>
    <!-- 2/3，只有1个页面，如果不是tabbar，需要首页图标 -->
    <!-- 这种情况一般出现在用户直接打开分享出去的详情页面，或者使用redirectTo等API -->
    <navigator
      v-else-if="!isTabbar"
      open-type="switchTab"
      url="/pages/index/index"
      class="left-icon"
    >
      <view class="i-carbon-home text-current"></view>
    </navigator>
    <!-- 3/3，如果当前页就是tabbar页，不用去首页，也就是什么图标都不需要 -->
    <view class="title">{{ '我是标题' }}</view>
  </view>
  <!-- #endif -->

  <scroll-view
    enable-back-to-top
    scroll-y
    class="scroll-view-bg flex-1 h-full"
    id="scroller"
    refresher-enabled
    @scrolltolower="onScrollToLower"
    @refresherrefresh="onRefresherRefresh"
    :refresher-triggered="isTriggered"
  >
    <view class="top-section" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <view class="pt-1">顶部区域</view>
      <view>可以是标题，也可以是个人中心头像等</view>
      <view>建议本区域高度不低于200rpx</view>
    </view>
    <view class="p-2 leading-6 bg-white">
      注意，上面的导航栏渐变效果仅微信端支持，且上面的导航栏无法抽为组件引入使用，否则滚动效果没有了。如果不只是微信小程序使用，可以
      onPageScroll 实现全端效果一样，另外如果是app端，还可以配置 titleNView。参考
      https://uniapp.dcloud.net.cn/tutorial/page.html#onpagescroll 。
    </view>
    <view class="bg-white">
      <fly-content :line="30" />
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import { onPullDownRefresh } from '@dcloudio/uni-app'
import useNavbarWeixin from '@/hooks/useNavbarWeixin'

const { pages, isTabbar, onScrollToLower, safeAreaInsets } = useNavbarWeixin()

// 发现原生下拉刷新效果并不好，在微信里面只有顶部导航栏下拉才生效，页面区域下拉不生效，体验不好，结合自定义下拉刷新效果很好
onPullDownRefresh(() => {
  setTimeout(function fn() {
    console.log('refresh - onPullDownRefresh')
    // 关闭动画
    uni.stopPullDownRefresh()
  }, 1000)
})

// 当前下拉刷新状态
const isTriggered = ref(false)
// 自定义下拉刷新被触发
const onRefresherRefresh = async () => {
  // 开始动画
  isTriggered.value = true
  setTimeout(function fn() {
    console.log('refresh - onRefresherRefresh')
    // 关闭动画
    isTriggered.value = false
  }, 1000)
}
</script>

<style lang="scss">
.scroll-view-bg {
  // 这个背景色要与.top-section的背景图差不多，这样下拉刷新看起来才比较协调
  background-color: #23c09c;
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
