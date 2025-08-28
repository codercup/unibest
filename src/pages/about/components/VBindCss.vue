<script lang="ts" setup>
// 备注：本文件内容直接放到 about.vue 页面，在`微信小程序`里面不生效，单独放到一个文件却生效，原因未知
const testBindCssVariable = ref('red')
function changeTestBindCssVariable() {
  if (testBindCssVariable.value === 'red') {
    testBindCssVariable.value = 'green'
  }
  else {
    testBindCssVariable.value = 'red'
  }
}
</script>

<template>
  <button class="mt-4 w-60 text-center" @click="changeTestBindCssVariable">
    toggle v-bind css变量
  </button>
  <view class="test-css my-2 text-center">
    测试v-bind css变量的具体文案
  </view>
</template>

<style lang="scss" scoped>
.test-css {
  color: v-bind(testBindCssVariable);
  font-size: 24px;
}
</style>
