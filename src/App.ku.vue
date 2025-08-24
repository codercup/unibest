<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore } from '@/store'
import FgTabbar from '@/tabbar/index.vue'
import { isPageTabbar } from './tabbar/store'
import { currRoute } from './utils'

const themeStore = useThemeStore()

const isCurrentPageTabbar = ref(true)
onShow(() => {
  console.log('App.ku.vue onShow', currRoute())
  const { path } = currRoute()
  isCurrentPageTabbar.value = isPageTabbar(path)
})

const helloKuRoot = ref('Hello AppKuVue')

const exposeRef = ref('this is form app.Ku.vue')

defineExpose({
  exposeRef,
})
</script>

<template>
  <view class="text-center">
    {{ helloKuRoot }}，这里可以配置全局的东西
  </view>
  <wd-config-provider :theme-vars="themeStore.themeVars" :theme="themeStore.theme">
    <KuRootView />
  </wd-config-provider>

  <FgTabbar v-if="isCurrentPageTabbar" />
  <wd-toast />
  <wd-message-box />
</template>
