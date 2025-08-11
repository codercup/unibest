<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'
import FgTabbar from '@/tabbar/index.vue'

const themeVars: ConfigProviderThemeVars = {
  // colorTheme: 'red',
  // buttonPrimaryBgColor: '#07c160',
  // buttonPrimaryColor: '#07c160',
}
const testUniLayoutExposedData = ref('testUniLayoutExposedData')
defineExpose({
  testUniLayoutExposedData,
})
</script>

<template>
  <wd-config-provider :theme-vars="themeVars">
    <slot />
    <FgTabbar />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>
