<route lang="json5" type="page">
{
  style: { navigationBarTitleText: 'enum' },
}
</route>

<template>
  <view class="">enum</view>
</template>

<script lang="ts" setup>
import { TestEnum } from '@/typings.d'

type T = TestEnum.A
const a = 'a' as T
console.log(a)
</script>

<style lang="scss" scoped>
//
</style>
