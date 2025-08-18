<route lang="jsonc" type="page">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "登录"
  }
}
</route>

<script lang="ts" setup>
import LoginH5 from './login.h5.vue'
import LoginWeixin from './login.weixin.vue'
</script>

<template>
  <!-- #ifdef H5 || APP-PLUS -->
  <LoginH5 />
  <!-- #endif -->
  <!-- #ifdef MP-WEIXIN -->
  <LoginWeixin />
  <!-- #endif -->
</template>

<style lang="scss" scoped>
//
</style>
