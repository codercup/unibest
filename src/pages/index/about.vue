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
    <view class="text-center text-3xl mt-4 test-css">关于页面</view>
    <view class="text-center text-3xl mt-8">
      鸽友们好，我是
      <text class="text-red-500">菲鸽</text>
    </view>
    <view class="text-center mt-8 text-#fff">
      <wd-button type="primary" @click="gotoPage('request')">去请求页</wd-button>
      <wd-button type="primary" @click="gotoPage('request2')" custom-class="ml-2">
        去请求页2 (状态一体)
      </wd-button>
    </view>

    <view class="text-center mt-8 text-#fff">
      <wd-button type="primary" @click="gotoPage('upload')">上传demo</wd-button>
      <wd-button type="primary" @click="gotoPage('upload2')" custom-class="ml-2">
        上传demo2(状态一体)
      </wd-button>
    </view>
    <view class="text-center mt-8">
      <text class="mr-2">iconfont:</text>
      <view class="inline-flex gap-2 text-red">
        <view class="iconfont icon-my" />
        <view class="iconfont icon-chat" />
        <view class="iconfont icon-package" />
      </view>
    </view>
  </view>
  <fg-tabbar />
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
.test-css {
  // mt-4=>1rem=>16px;
  margin-top: 16px;
}
</style>
