<template>
  <wd-config-provider :themeVars="themeVars">
    <wd-notify />
    <wd-toast />
    <wd-message-box />
    <!-- <privacy-popup></privacy-popup> -->
    <slot></slot>
    <wd-tabbar
      fixed
      :model-value="tabbarStore.getActive.name"
      @change="handleChange"
      bordered
      safeAreaInsetBottom
      placeholder
    >
      <wd-tabbar-item
        v-for="(item, index) in tabbarStore.getTabbarItems"
        :key="index"
        :name="item.name"
        :value="tabbarStore.getTabbarItemValue(item.name)"
        :title="item.title"
        :icon="item.icon"
      ></wd-tabbar-item>
    </wd-tabbar>
  </wd-config-provider>
</template>
<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>
<script lang="ts" setup>
import { useTabbarStore } from '@/store/tabbar'
import { ConfigProviderThemeVars } from 'wot-design-uni'

const tabbarStore = useTabbarStore()

const themeVars = reactive<ConfigProviderThemeVars>({
  colorTheme: '#fa4126',
  tabsNavLineBgColor: 'red',
})

function handleChange({ value }) {
  tabbarStore.setTabbarItemActive(value)
  uni.navigateTo({
    url: tabbarStore.getTabbarItemRoute(value),
  })
}

onShow(() => {
  // #ifdef APP-PLUS
  uni.hideTabBar()
  // #endif
})
</script>
<style lang="scss" scoped></style>
