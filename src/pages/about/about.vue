<route lang="jsonc" type="page">
{
  "layout": "tabbar",
  "style": {
    "navigationBarTitleText": "%tabbar.about%"
  }
}
</route>

<script lang="ts" setup>
import { t } from '@/locale'
import RequestComp from './components/request.vue'

function gotoI18nPage() {
  uni.navigateTo({
    url: '/pages/about/i18n',
  })
}

// 奇怪：同样的代码放在 vue 里面不会校验到错误，放在 .ts 文件里面会校验到错误
// const testOxlint = (name: string) => {
//   console.log('oxlint')
// }
// testOxlint('oxlint')
console.log('about')

function gotoAlova() {
  uni.navigateTo({
    url: '/pages/about/alova',
  })
}
function gotoVueQuery() {
  uni.navigateTo({
    url: '/pages/about/vue-query',
  })
}

onShow(() => {
  uni.setNavigationBarTitle({
    title: t('tabbar.about'),
  })
})
</script>

<template>
  <view>
    <view class="mt-8 text-center text-3xl">
      鸽友们好，我是
      <text class="text-red-500">
        菲鸽
      </text>
    </view>
    <RequestComp />
    <view class="text-center">
      <button type="primary" size="mini" class="w-160px" @click="gotoI18nPage()">
        去I18n页面
      </button>
    </view>
    <view class="text-center">
      <button type="primary" size="mini" class="w-160px" @click="gotoAlova">
        前往 alova 示例页面
      </button>
    </view>
    <view class="text-center">
      <button type="primary" size="mini" class="w-160px" @click="gotoVueQuery">
        vue-query 示例页面
      </button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.test-css {
  // mt-4=>1rem=>16px;
  margin-top: 16px;
}
</style>
