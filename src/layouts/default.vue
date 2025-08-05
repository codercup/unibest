<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'
import { getI18nText } from '@/tabbar/i18n'
import { getCurrentPageI18nKey } from '@/utils'

const themeVars: ConfigProviderThemeVars = {
  // colorTheme: 'red',
  // buttonPrimaryBgColor: '#07c160',
  // buttonPrimaryColor: '#07c160',
}
onShow(() => {
  console.log('default - onShow')
  uni.setNavigationBarTitle({
    title: getI18nText(getCurrentPageI18nKey()),
  })
})
</script>

<template>
  <wd-config-provider :theme-vars="themeVars">
    <slot />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>
