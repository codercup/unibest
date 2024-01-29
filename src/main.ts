import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store'
import i18n from './locales/index'
import 'virtual:svg-icons-register'
import 'virtual:uno.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store).use(i18n)
  return {
    app,
  }
}
