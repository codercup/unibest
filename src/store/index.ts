// src/store/index.ts
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate' // 数据持久化

const store = createPinia()
store.use(piniaPersist)

export default store
