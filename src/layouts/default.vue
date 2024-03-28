<template>
  <view class="default-layout">
    <wd-config-provider :theme="theme" :themeVars="themeVars">
      <slot />
    </wd-config-provider>
  </view>
</template>
<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars: ConfigProviderThemeVars = {
  // 定制 WOT-UI库的主题色
  // colorTheme: '#8053f9',
}
// 获取系统主题色
const theme = ref('dark')

uni.getSystemInfo({
  success(res) {
    theme.value = res.hostTheme
  },
})
</script>

<style lang="scss">
.default-layout {
  height: 100vh;
  overflow: auto;
}
</style>
