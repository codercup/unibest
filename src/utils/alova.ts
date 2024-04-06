import { createAlova } from 'alova'
import AdapterUniapp from '@alova/adapter-uniapp'

// 请求基地址
const baseURL = import.meta.env.VITE_SERVER_BASEURL
export const alovaInst = createAlova({
  baseURL,
  ...AdapterUniapp(),
})
