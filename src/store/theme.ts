import type { ConfigProviderThemeVars } from 'wot-design-uni'

import { defineStore } from 'pinia'

export const useThemeStore = defineStore(
  'theme-store',
  () => {
    /** 主题 */
    const theme = ref<'light' | 'dark'>('light')

    /** 主题变量 */
    const themeVars = ref<ConfigProviderThemeVars>({
      // colorTheme: 'red',
      // buttonPrimaryBgColor: '#07c160',
      // buttonPrimaryColor: '#07c160',
    })

    /** 设置主题变量 */
    const setThemeVars = (partialVars: Partial<ConfigProviderThemeVars>) => {
      themeVars.value = { ...themeVars.value, ...partialVars }
    }

    /** 切换主题 */
    const toggleTheme = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    return {
      /** 设置主题变量 */
      setThemeVars,
      /** 切换主题 */
      toggleTheme,
      /** 主题变量 */
      themeVars,
      /** 主题 */
      theme,
    }
  },
  {
    persist: true,
  },
)
