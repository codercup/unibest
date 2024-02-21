import { createSSRApp } from 'vue'
import uvui from '@climblee/uv-ui'
import App from './App.vue'
import store from './store'
import tmui from './tmui'
import i18n from './locale/index'
import 'virtual:svg-icons-register'
import 'virtual:uno.css'
import '@/style/index.scss'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(i18n)
  app.use(uvui)
  app.use(tmui, {})
  return {
    app,
  }
}
