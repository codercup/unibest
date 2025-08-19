<script lang="ts" setup>
import { useThemeStore } from '@/store'
import { getI18nText } from '@/tabbar/i18n'
import { getCurrentPageI18nKey } from '@/utils'

onShow(() => {
  console.log('layout default - onShow')
  uni.setNavigationBarTitle({
    title: getI18nText(getCurrentPageI18nKey()),
  })
})

const themeStore = useThemeStore()
</script>

<template>
  <wd-config-provider :theme-vars="themeStore.themeVars" :theme="themeStore.theme">
    <slot />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>
