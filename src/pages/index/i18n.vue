<route lang="json">
{
  "style": {
    "navigationBarTitleText": "%app.name%"
  }
}
</route>

<template>{{ $t('app.name') }}</template>

<script lang="ts" setup>
import { testI18n } from '@/utils/index'

testI18n()
</script>
