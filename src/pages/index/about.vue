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
    <view class="text-center mt-8">
      <wd-button type="primary" @click="gotoPage('i18n')">进入多语言页面</wd-button>
      <wd-button type="primary" @click="gotoPage('request')" class="ml-2">去请求页</wd-button>
    </view>

    <view class="text-center mt-8 text-#fff">
      <wd-button type="primary" @click="gotoPage('upload')">上传demo</wd-button>
      <wd-button type="primary" @click="gotoPage('upload2')">上传demo2(请求状态一体化)</wd-button>
    </view>
    <view class="text-center mt-8">
      <text mr-2>iconfont:</text>
      <text class="gap-2 text-red">
        <i class="iconfont icon-my" />
        <i class="iconfont icon-chat" />
        <i class="iconfont icon-package" />
      </text>
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
.test-css {
  // mt-4=>1rem=>16px;
  margin-top: 16px;
}
</style>
