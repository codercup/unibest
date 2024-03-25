import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store'
import i18n from './locale/index'
import { routeInterceptor, requestInterceptor } from './interceptors'
import 'virtual:svg-icons-register'
import 'virtual:uno.css'
import '@/style/index.scss'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(i18n)
  app.use(routeInterceptor)
  app.use(requestInterceptor)
  return {
    app,
  }
}
