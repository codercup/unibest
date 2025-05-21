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
    <view class="text-center text-3xl mt-8">
      鸽友们好，我是
      <text class="text-red-500">菲鸽</text>
    </view>
    <view class="text-center mt-8 text-#fff">
      <wd-button type="success" @click="gotoPage('i18n')">进入多语言页面</wd-button>
    </view>
    <view class="test-css">测试 scss 样式</view>
    <RequestComp />
    <UploadComp />
  </view>
</template>

<script lang="ts" setup>
import RequestComp from './components/request.vue'
import UploadComp from './components/upload.vue'
import i18n, { t } from '@/locale/index'

onShow(() => {
  console.log('About Show', t('app.name'))
  console.log(uni.getLocale())
  console.log(i18n.global.locale)
  // #ifdef MP-WEIXIN
  // fix 微信小程序需要手动调用 api 设置一次国际化标题。
  uni.setNavigationBarTitle({ title: t('app.name') })
  // #endif
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const gotoPage = (path) => {
  uni.navigateTo({
    url: `/pages/about/${path}`,
  })
}
</script>

<style lang="scss" scoped>
.test-css {
  // 16rpx=>0.5rem
  padding-bottom: 16rpx;
  // mt-4=>1rem=>16px;
  margin-top: 16px;
  text-align: center;
}
</style>
