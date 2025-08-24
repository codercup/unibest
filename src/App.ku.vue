<script setup lang="ts">
import { ref } from 'vue'
import FgTabbar from '@/tabbar/index.vue'
import { isPageTabbar } from './tabbar/store'
import { currRoute } from './utils'

const isCurrentPageTabbar = ref(true)
onShow(() => {
  console.log('App.ku.vue onShow', currRoute())
  const { path } = currRoute()
  isCurrentPageTabbar.value = isPageTabbar(path)
})

const helloKuRoot = ref('Hello AppKuVue')
</script>

<template>
  <view class="text-center">
    {{ helloKuRoot }}，这里可以配置全局的东西
  </view>
  <!-- 顶级 KuRootView -->
  <KuRootView />
  <FgTabbar v-if="isCurrentPageTabbar" />
</template>
