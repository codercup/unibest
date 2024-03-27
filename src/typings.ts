/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// 全局要用的类型放到这里

type IResData<T> = {
  code: number
  msg: string
  result: T
}

type IUserInfo = {
  nickname?: string
  avatar?: string
  /** 微信的 openid，非微信没有这个字段 */
  openid?: string
  token?: string
}

enum TestEnum {
  A = 'a',
  B = 'b',
}
