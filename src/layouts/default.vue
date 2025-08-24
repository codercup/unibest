<script lang="ts" setup>
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()

const testUniLayoutExposedData = ref('testUniLayoutExposedData')
defineExpose({
  testUniLayoutExposedData,
})
</script>

<template>
  <wd-config-provider :theme-vars="themeStore.themeVars" :theme="themeStore.theme">
    <slot />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>
