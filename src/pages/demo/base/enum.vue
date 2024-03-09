<route lang="json5" type="page">
{
  hide: true,
  style: { navigationBarTitleText: 'enum 使用' },
}
</route>

<template>
  <view class="center mt-8 text-green-600">enum 使用，script setup 里面这样写不会报错</view>
</template>

<script lang="ts" setup>
type T = TestEnum.A
const a = 'a' as T
console.log(a)
</script>

<style lang="scss" scoped>
//
</style>
