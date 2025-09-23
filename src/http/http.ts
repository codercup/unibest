import type { IDoubleTokenRes } from '@/api/types/login'
import type { CustomRequestOptions, HttpRequestResult, IResponse } from '@/http/types'
import { nextTick } from 'vue'
import { LOGIN_PAGE } from '@/router/config'
import { useTokenStore } from '@/store/token'
import { isDoubleTokenMode } from '@/utils'
import { ResultEnum } from './tools/enum'

// 刷新 token 状态管理
let refreshing = false // 防止重复刷新 token 标识
let taskQueue: { resolve: (value: any) => void, reject: (reason?: any) => void, options: CustomRequestOptions }[] = [] as { resolve: (value: any) => void, reject: (reason?: any) => void, options: CustomRequestOptions }[] // 刷新 token 请求队列

export function http<T>(options: CustomRequestOptions): HttpRequestResult<T> {
  let requestTask: UniApp.RequestTask | undefined
  const promise = new Promise<T>((resolve, reject) => {
    requestTask = uni.request({
      ...options,
      dataType: 'json',
      // #ifndef MP-WEIXIN
      responseType: 'json',
      // #endif
      // 响应成功
      success: async (res) => {
        // 状态码 2xx，参考 axios 的设计
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1  处理业务逻辑错误
          const { code, message, msg, data } = res.data as IResponse<T>
          // 0和200当做成功都很普遍，这里直接兼容两者，见 ResultEnum
          if (code !== ResultEnum.Success0 && code !== ResultEnum.Success200) {
            throw new Error(`请求错误[${code}]：${message || msg}`)
          }
          return resolve(data as T)
        }
        const resData: IResData<T> = res.data as IResData<T>
        if ((res.statusCode === 401) || (resData.code === 401)) {
          const tokenStore = useTokenStore()
          if (!isDoubleTokenMode) {
            // 未启用双token策略，清理用户信息，跳转到登录页
            tokenStore.logout()
            uni.navigateTo({ url: LOGIN_PAGE })
            return reject(res)
          }
          /* -------- 无感刷新 token ----------- */
          const { refreshToken } = tokenStore.tokenInfo as IDoubleTokenRes || {}
          // token 失效的，且有刷新 token 的，才放到请求队列里
          if ((res.statusCode === 401 || resData.code === 401) && refreshToken) {
            taskQueue.push({ resolve, reject, options })
          }
          // 如果有 refreshToken 且未在刷新中，发起刷新 token 请求
          if ((res.statusCode === 401 || resData.code === 401) && refreshToken && !refreshing) {
            refreshing = true
            try {
              // 发起刷新 token 请求（使用 store 的 refreshToken 方法）
              await tokenStore.refreshToken()
              // 刷新 token 成功
              refreshing = false
              nextTick(() => {
                // 关闭其他弹窗
                uni.hideToast()
                uni.showToast({
                  title: 'token 刷新成功',
                  icon: 'none',
                })
              })
              // 将任务队列的所有任务重新请求
              taskQueue.forEach((task) => {
                http<T>(task.options).promise.then(task.resolve, task.reject)
              })
            }
            catch (refreshErr) {
              console.error('刷新 token 失败:', refreshErr)
              refreshing = false
              // 刷新 token 失败，跳转到登录页
              nextTick(() => {
                // 关闭其他弹窗
                uni.hideToast()
                uni.showToast({
                  title: '登录已过期，请重新登录',
                  icon: 'none',
                })
              })
              // 清除用户信息
              await tokenStore.logout()
              // 跳转到登录页
              setTimeout(() => {
                uni.navigateTo({ url: LOGIN_PAGE })
              }, 2000)
            }
            finally {
              // 不管刷新 token 成功与否，都清空任务队列
              taskQueue = []
            }
          }
        }
        else {
          // 其他错误 -> 根据后端错误信息轻提示
          !options.hideErrorToast
          && uni.showToast({
            icon: 'none',
            title: (res.data as IResData<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err: UniApp.RequestSuccessCallbackResult | UniApp.GeneralCallbackResult) {
        console.log(`🚀 - fail - err:`, err)
        // 如果是请求取消，则不显示错误提示
        if (err.errMsg === 'request:fail abort') {
          return reject(new Error('Request cancelled'))
        }
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
  return { promise, requestTask: requestTask! }
}

/**
 * GET 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @param header 请求头，默认为json格式
 * @returns
 */
export function httpGet<T>(url: string, query?: Record<string, any>, header?: Record<string, any>, options?: Partial<CustomRequestOptions>) {
  return http<T>({
    url,
    query,
    method: 'GET',
    header,
    ...options,
  })
}

/**
 * POST 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数，post请求也支持query，很多微信接口都需要
 * @param header 请求头，默认为json格式
 * @returns
 */
export function httpPost<T>(url: string, data?: Record<string, any>, query?: Record<string, any>, header?: Record<string, any>, options?: Partial<CustomRequestOptions>) {
  return http<T>({
    url,
    query,
    data,
    method: 'POST',
    header,
    ...options,
  })
}
/**
 * PUT 请求
 */
export function httpPut<T>(url: string, data?: Record<string, any>, query?: Record<string, any>, header?: Record<string, any>, options?: Partial<CustomRequestOptions>) {
  return http<T>({
    url,
    data,
    query,
    method: 'PUT',
    header,
    ...options,
  })
}

/**
 * DELETE 请求（无请求体，仅 query）
 */
export function httpDelete<T>(url: string, query?: Record<string, any>, header?: Record<string, any>, options?: Partial<CustomRequestOptions>) {
  return http<T>({
    url,
    query,
    method: 'DELETE',
    header,
    ...options,
  })
}

// 支持与 axios 类似的API调用
http.get = httpGet
http.post = httpPost
http.put = httpPut
http.delete = httpDelete

// 支持与 alovaJS 类似的API调用
http.Get = httpGet
http.Post = httpPost
http.Put = httpPut
http.Delete = httpDelete
