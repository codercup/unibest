// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './custom.css'

import HomeStar from './components/HomeStar.vue'
import NavBarTitleAfter from './components/NavBarTitleAfter.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'home-hero-info-after': () => h(HomeStar),
      'nav-bar-title-after': () => h(NavBarTitleAfter),
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  },
} satisfies Theme
