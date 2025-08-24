<script lang="ts" setup>
import { getI18nText } from '@/tabbar/i18n'
import { getCurrentPageI18nKey } from '@/utils'

onShow(() => {
  console.log('layout default - onShow')
  uni.setNavigationBarTitle({
    title: getI18nText(getCurrentPageI18nKey()),
  })
})
</script>

<template>
  <slot />
</template>
