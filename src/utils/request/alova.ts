import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'

const http = createAlova({
  baseURL: import.meta.env.VITE_APP_PROXY_PREFIX,
  ...AdapterUniapp(),
})
