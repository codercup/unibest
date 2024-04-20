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
    <view class="text-center mt-8 text-#fff">
      <wd-button type="primary" @click="gotoPage('request')">去请求页</wd-button>
      <wd-button type="primary" @click="gotoPage('request2')" class="ml-2">
        去请求页2 (请求状态一体化)
      </wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

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
