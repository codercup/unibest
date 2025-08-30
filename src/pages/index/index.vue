<script lang="ts" setup>
import { LOGIN_PAGE } from '@/router/config'
import { useThemeStore } from '@/store'
import { safeAreaInsets } from '@/utils/systemInfo'

defineOptions({
  name: 'Home',
})
definePage({
  // 使用 type: "home" 属性设置首页，其他页面不需要设置，默认为page
  type: 'home',
  style: {
    // 'custom' 表示开启自定义导航栏，默认 'default'
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
})

const themeStore = useThemeStore()

const author = ref('菲鸽')
const description = ref(
  'unibest 是一个集成了多种工具和技术的 uniapp 开发模板，由 uniapp + Vue3 + Ts + Vite5 + UnoCss + VSCode 构建，模板具有代码提示、自动格式化、统一配置、代码片段等功能，并内置了许多常用的基本组件和基本功能，让你编写 uniapp 拥有 best 体验。',
)
console.log('index/index 首页打印了')

onLoad(() => {
  console.log('测试 uni API 自动引入: onLoad')
})

function toLogin() {
  uni.navigateTo({
    url: LOGIN_PAGE,
  })
}
</script>

<template>
  <view class="bg-white px-4 pt-2" :style="{ marginTop: `${safeAreaInsets?.top}px` }">
    <view class="mt-10">
      <image src="/static/logo.svg" alt="" class="mx-auto block h-28 w-28" />
    </view>
    <view class="mt-4 text-center text-4xl text-[#d14328]">
      unibest
    </view>
    <view class="mb-8 mt-2 text-center text-2xl">
      最好用的 uniapp 开发模板
    </view>

    <view class="m-auto mb-2 max-w-100 text-justify indent text-4">
      {{ description }}
    </view>
    <view class="mt-4 text-center">
      作者：
      <text class="text-green-500">
        菲鸽
      </text>
    </view>
    <view class="mt-4 text-center">
      官网地址：
      <text class="text-green-500">
        https://unibest.tech
      </text>
    </view>

    <!-- #ifdef H5 -->
    <view class="mt-4 text-center">
      <a href="https://unibest.tech/base/3-plugin" target="_blank" class="text-green-500">
        新手请看必看章节1：
      </a>
    </view>
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <view class="mt-4 text-center">
      新手请看必看章节1：
      <text class="text-green-500">
        https://unibest.tech/base/3-plugin
      </text>
    </view>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <view class="mt-4 text-center">
      <a href="https://unibest.tech/base/14-faq" target="_blank" class="text-green-500">
        新手请看必看章节2：
      </a>
    </view>
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <view class="mt-4 text-center">
      新手请看必看章节2：
      <text class="text-green-500">
        https://unibest.tech/base/14-faq
      </text>
    </view>
    <!-- #endif -->

    <view class="mt-4 text-center">
      <wd-button type="primary" class="ml-2" @click="themeStore.setThemeVars({ colorTheme: 'red' })">
        设置主题变量
      </wd-button>
    </view>
    <view class="mt-4 text-center">
      UI组件官网：<text class="text-green-500">
        https://wot-design-uni.cn
      </text>
    </view>
    <button class="mt-4 w-40 text-center" @click="toLogin">
      点击去登录页
    </button>
    <view class="h-6" />
  </view>
</template>
