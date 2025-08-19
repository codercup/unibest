<script lang="ts" setup>
import { useThemeStore } from '@/store'
import FgTabbar from '@/tabbar/index.vue'

const themeStore = useThemeStore()

const testUniLayoutExposedData = ref('testUniLayoutExposedData')
defineExpose({
  testUniLayoutExposedData,
})
</script>

<template>
  <wd-config-provider :theme-vars="themeStore.themeVars" :theme="themeStore.theme">
    <slot />
    <FgTabbar />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>
