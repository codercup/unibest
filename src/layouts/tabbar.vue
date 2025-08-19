<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'
import { useThemeStore } from '@/store'
import { getI18nText } from '@/tabbar/i18n'
import FgTabbar from '@/tabbar/index.vue'
import { getCurrentPageI18nKey } from '@/utils'

const themeVars: ConfigProviderThemeVars = {
  // colorTheme: 'red',
  // buttonPrimaryBgColor: '#07c160',
  // buttonPrimaryColor: '#07c160',
}
onShow(() => {
  console.log('layout tabbar - onSHow')
  uni.setNavigationBarTitle({
    title: getI18nText(getCurrentPageI18nKey()),
  })
})
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
