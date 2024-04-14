<route lang="json5">
{
  style: { navigationBarTitleText: 'unibest 示例' },
}
</route>

<template>
  <view class="bg-slate-100 min-h-full box-border pb-3">
    <view class="tab-container sticky top-0 bg-white px-4 center h-12 z-1">
      <view
        class="w-full text-center h-10 leading-10 rounded-md"
        :class="{ 'bg-green-300': idx === currIdx }"
        v-for="(tab, idx) in tabList"
        :key="tab.id"
      >
        <view class="font-800" @click="currIdx = idx">{{ tab.title }}</view>
      </view>
    </view>
    <view class="bg-slate-100 px-4 pt-3">
      <view class="list-container">
        <view v-for="item in currContentList" :key="item.path" class="mb-3">
          <view
            class="flex bg-white items-center justify-between p-3 mb-2"
            @click="goDetailPage(item.path)"
          >
            <text class="flex-1 text-4 text-dark">{{ item.title }}</text>
            <text class="i-carbon-chevron-right"></text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts" name="TestIndex">
import pagesJson from '@/pages.json'

const handleTitle = (str?: string) => {
  if (!str) {
    return '标题'
  }
  if (/%.*%/.test(str)) {
    return '多语言'
  }
  return str
}
/** 基本功能 */
const baseDemos = pagesJson.pages
  .filter((e) => e.path.startsWith('pages/demo/base') && !e.hide)
  .map((e) => ({
    title: handleTitle(e.style?.navigationBarTitleText),
    path: e.path,
  }))

/** 页面功能 */
const pageDemos = pagesJson.pages
  .filter((e) => e.path.startsWith('pages/demo/page') && !e.hide)
  .map((e) => ({
    title: handleTitle(e.style?.navigationBarTitleText),
    path: e.path,
  }))

const routeInterceptionList = [
  {
    title: '说明页面',
    path: 'pages/demo/route-interceptor/index',
  },
  {
    title: '单独登录页面',
    path: 'pages/demo/route-interceptor/login-page?name=feige&age=30',
  },
  {
    title: '登录弹窗',
    path: 'pages/demo/route-interceptor/login-model?name=feige&age=30',
  },
  {
    title: '静默登录',
    path: 'pages/demo/route-interceptor/login-auto?name=feige&age=30',
  },
]
const tabList = reactive([
  {
    id: 1,
    title: '基础功能',
    list: baseDemos,
  },
  {
    id: 2,
    title: '登录拦截',
    list: routeInterceptionList,
  },
  {
    id: 3,
    title: '页面功能',
    list: pageDemos,
  },
])
const currIdx = ref(0)
const currContentList = computed(() => {
  return tabList[currIdx.value].list
})
const goDetailPage = (path: string) => {
  const url = `/${path}`
  uni.navigateTo({
    url,
  })
}
</script>

<style>
page {
  height: 100%;
}

.tab-container {
  display: flex;
}

.list-container {
  padding-bottom: var(--window-bottom);
}
</style>
