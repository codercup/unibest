<template>
  <view class="bg-slate-100">
    <view class="bg-slate-100 w-full">
      <view v-for="item in list" :key="item.url" class="mt-3">
        <view
          class="flex bg-white items-center justify-between p-3 mb-2"
          @click="goDetailPage(item.url)"
        >
          <text class="flex-1 text-4 text-dark">{{ item.name }}</text>
          <text class="i-carbon-chevron-right"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts" name="TestIndex">
import { ref } from 'vue'

// TODO: 通过pages.json 文件里面的 path 和 navigationBarTitleText，生成数组
const list = ref([
  {
    name: 'UnoCSS',
    url: 'unocss',
  },
  {
    name: 'UnoCSS Icons',
    url: 'unocss-icons',
  },
  {
    name: 'UniUI',
    url: 'uni-ui',
  },
  {
    name: 'UniUI Icons',
    url: 'uni-ui-icons',
  },
  {
    name: 'Pinia+持久化',
    url: 'pinia',
  },
  {
    name: '微信分享',
    url: 'mp-weixin-share',
  },
  {
    name: '自定义导航栏',
    url: 'navbar',
  },
  {
    name: '自定义导航栏渐变',
    url: 'throughout',
  },
  {
    name: '请求封装+请求拦截器',
    url: 'request',
  },
])
const goDetailPage = (path: string) => {
  const url = `/pages/demo/demo/${path}`
  uni.navigateTo({
    url,
  })
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 200rpx;
  height: 200rpx;
  margin: 200rpx auto 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
