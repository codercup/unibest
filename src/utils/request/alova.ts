import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'

const baseURL = JSON.parse(__VITE_APP_PROXY__)
  ? import.meta.env.VITE_APP_PROXY_PREFIX
  : import.meta.env.VITE_SERVER_BASEURL

export const http = createAlova({
  baseURL,
  ...AdapterUniapp(),
  async responded(res: UniApp.RequestSuccessCallbackResult, method) {
    console.log('responded:', method, res)
    // 请求成功的拦截器
    // 状态码 2xx，参考 axios 的设计
    const resData = res.data as IResData<any>
    if (res.statusCode >= 200 && res.statusCode < 300) {
      // 2.1 提取核心数据 res.data
      return resData.data
    }
    else if (res.statusCode === 401) {
      // 401错误  -> 清理用户信息，跳转到登录页
      // userStore.clearUserInfo()
      // uni.navigateTo({ url: '/pages/login/login' })
      console.log(res)
      throw new Error(resData.msg || '401错误')
    }
    else {
      uni.showToast({
        icon: 'none',
        title: (resData).msg || '请求错误',
      })
      throw new Error(resData.msg || '请求错误')
    }
  },
})
