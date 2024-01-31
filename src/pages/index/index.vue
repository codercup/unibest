<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view
    class="bg-white h-full overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <view class="mt-12">
      <image src="/static/logo.svg" alt="" class="w-26 h-26 block mx-auto" />
    </view>
    <view class="text-center text-4xl main-title-color mt-3">unibest</view>
    <view class="text-center text-2xl mt-2 mb-8">最好用的 uniapp 开发模板</view>
    <view class="text-justify max-w-100 m-auto text-4 indent mb-2">{{ description }} </view>
    <view class="text-blue mt-8 text-center text-sm"> 详细示例 参考 hello-unibest 项目 </view>

    <!-- #ifdef H5 -->
    <view class="my-2 text-center">
      <a class="my-2 text-center" :href="quoteUrl" target="_blank">{{ quoteUrl }}</a>
    </view>
    <!-- #endif -->

    <!-- #ifndef H5 -->
    <view class="my-2 text-left text-sm">{{ quoteUrl }}</view>
    <!-- #endif -->
  </view>
</template>

<script lang="ts" setup>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const author = ref('菲鸽')
const quoteUrl = ref('https://github.com/codercup/hello-unibest')
const description = ref(
  'unibest 是由 uniapp + Vue3 + Ts + Vite4 + UnoCss + UniUI 驱动的跨端快速启动模板，使用 VS Code 开发，具有代码提示、自动格式化、统一配置、代码片段等功能，同时内置了大量平时开发常用的基本组件，开箱即用，让你编写 uniapp 拥有 best 体验。',
)

onLoad(() => {
  console.log(author)
})
</script>

<style>
.main-title-color {
  color: #d14328;
}
</style>
