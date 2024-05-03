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
      <wd-button type="primary" @click="gotoPage('request2')" class="ml-2">
        去请求页2 (请求状态一体化)
      </wd-button>
    </view>
    <view class="text-center mt-8 text-#fff">
      <wd-button type="primary" @click="gotoPage('upload')">上传demo</wd-button>
      <wd-button type="primary" @click="gotoPage('upload2')">上传demo2(请求状态一体化)</wd-button>
    </view>

    <view class="mt-8">vue 升级到了 3.4+，测试下 defineModel 是否可用</view>

    <!-- Parent.vue -->
    <view class="mt-8">countModel: {{ countModel }}</view>
    <Child v-model="countModel" />
  </view>
</template>

<script lang="ts" setup>
import Child from './components/Child.vue'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const gotoPage = (page: string) => {
  uni.navigateTo({
    url: `/pages/index/${page}`,
  })
}

const countModel = ref(0)
</script>

<style lang="scss" scoped>
.test-css {
  // mt-4=>1rem=>16px;
  margin-top: 16px;
}
</style>
