import { createAlova } from 'alova'
import { createAlovaMockAdapter } from '@alova/mock'
import AdapterUniapp, { uniappRequestAdapter, uniappMockResponse } from '@alova/adapter-uniapp'
import mocks from '@/mocks'

const mockAdapter = createAlovaMockAdapter(mocks, {
  // 指定uniapp请求适配器后，未匹配模拟接口的请求将使用这个适配器发送请求
  httpAdapter: uniappRequestAdapter,
  // 模拟响应适配器，指定后响应数据将转换为uniapp兼容的数据格式
  onMockResponse: uniappMockResponse,
})

export const http = createAlova({
  baseURL: import.meta.env.VITE_SERVER_BASEURL,
  ...AdapterUniapp({
    // 通过环境变量控制是否使用模拟请求适配器
    mockRequest: import.meta.env.DEV ? mockAdapter : undefined,
  }),
  beforeRequest() {
    // 给 Header 加上 token
    // const userStore = useUserStore()
    // const { token } = userStore.userInfo as IUserInfo
    // if (token) {
    //   // eslint-disable-next-line no-param-reassign
    //   method.config.headers.Authorization = `Bearer ${token}`
    // }
  },
  responded: {
    onError(err) {
      // 响应失败
      uni.showToast({
        icon: 'none',
        title: '网络错误，换个网络试试',
      })
      return Promise.reject(err)
    },
    async onSuccess(response) {
      const { statusCode, data } = response as UniNamespace.RequestSuccessCallbackResult
      if (statusCode >= 200 && statusCode < 300) {
        return data
      }
      // 401错误  -> 清理用户信息，跳转到登录页
      // if (statusCode === 401) {
      //   useUserStore().clearUserInfo()
      //   uni.navigateTo({ url: '/pages/login/index' })
      //   return Promise.reject(response)
      // }
      uni.showToast({
        icon: 'none',
        title: (data as AnyObject)?.message || '请求错误',
      })
      return Promise.reject(response)
    },
  },
})
