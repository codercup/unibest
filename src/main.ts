import { createSSRApp } from 'vue'
import uvUI from '@climblee/uv-ui'
import App from './App.vue'
import store from './store'
import 'virtual:svg-icons-register'
import 'virtual:uno.css'
import '@/style/index.scss'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(uvUI)
  return {
    app,
  }
}
