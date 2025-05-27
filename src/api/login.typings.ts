/**
 * 用户信息
 */
export type IUserInfoVo = {
  id: number
  username: string
  avatar: string
  token: string
}

/**
 * 登录返回的信息
 */
export type IUserLogin = {
  id: string
  username: string
  token: string
}

/**
 * 获取验证码
 */
export type ICaptcha = {
  captchaEnabled: boolean
  uuid: string
  image: string
}
/**
 * 上传成功的信息
 */
export type IUploadSuccessInfo = {
  fileId: number
  originalName: string
  fileName: string
  storagePath: string
  fileHash: string
  fileType: string
  fileBusinessType: string
  fileSize: number
}
/**
 * 更新用户信息
 */
export type IUpdateInfo = {
  id: number
  name: string
  sex: string
}
/**
 * 更新用户信息
 */
export type IUpdatePassword = {
  id: number
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
