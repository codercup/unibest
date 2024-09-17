<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view>'欢迎来到首页'</view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.main-title-color {
  color: #d14328;
}
</style>
