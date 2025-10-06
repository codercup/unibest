<script lang="ts" setup>
// root 插件更新到 1.3.4之后，都正常了。
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
