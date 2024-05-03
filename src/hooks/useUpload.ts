/**
 * useUpload 是一个定制化的请求钩子，用于处理异步请求和响应。
 * @param url 上传图片的后台地址，如 https://ukw0y1.laf.run/upload。
 * @param formData 额外传递给后台的数据，如{name: '菲鸽'}。
 * @returns 返回一个对象{loading, error, data, run}，包含请求的加载状态、错误信息、响应数据和手动触发请求的函数。
 */
export default function useUpload<T>(url: string, formData: Record<string, any> = {}) {
  const loading = ref(false)
  const error = ref(false)
  const data = ref<T>()

  const run = () => {
    // #ifdef MP-WEIXIN
    // 微信小程序从基础库 2.21.0 开始， wx.chooseImage 停止维护，请使用 uni.chooseMedia 代替。
    // 微信小程序在2023年10月17日之后，使用本API需要配置隐私协议
    uni.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: (res) => {
        console.log(res)
        loading.value = true
        const tempFilePath = res.tempFiles[0].tempFilePath
        uni.uploadFile({
          url,
          filePath: tempFilePath,
          name: 'file',
          formData,
          success: (uploadFileRes) => {
            console.log(uploadFileRes.data)
            data.value = uploadFileRes.data as T
          },
          fail: (err) => {
            console.log('uni.uploadFile err->', err)
            error.value = true
          },
          complete: () => {
            loading.value = false
          },
        })
      },
      fail: (err) => {
        console.log('uni.chooseMedia err->', err)
        error.value = true
      },
    })
    // #endif
    // #ifndef MP-WEIXIN
    uni.chooseImage({
      count: 1,
      success: (res) => {
        console.log(res)
        loading.value = true
        const tempFilePath = res.tempFilePaths[0]
        uni.uploadFile({
          url,
          filePath: tempFilePath,
          name: 'file',
          formData,
          success: (uploadFileRes) => {
            console.log(uploadFileRes.data)
            data.value = uploadFileRes.data as T
          },
          fail: (err) => {
            console.log('uni.uploadFile err->', err)
            error.value = true
          },
          complete: () => {
            loading.value = false
          },
        })
      },
      fail: (err) => {
        console.log('uni.chooseImage err->', err)
        error.value = true
      },
    })
    // #endif
  }

  return { loading, error, data, run }
}
