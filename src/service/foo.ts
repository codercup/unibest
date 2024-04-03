import { http } from '@/utils/http'

export interface IFooItem {
  createdAt: string
  id: string
  name: string
  phone: string
}

/** get 请求 */
export const getFooAPI = () => {
  return http.Get<IFooItem>(`/api/users/13`)
}

/** 更新请求 */
export const postFooAPI = (body: { name: string; phone: string }) => {
  return http.Put<IFooItem>(`/api/users/13`, body)
}

// 文件上传
export const fileUpload = (data: IUniUploadFileOptions) => {
  return http.Post(`/foo/upload`, data, {
    // 设置请求方式为上传，适配器内将调用uni.uploadFile
    requestType: 'upload',
    fileType: 'image',

    // 开启上传进度
    enableUpload: true,
  })
}
