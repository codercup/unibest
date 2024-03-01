/* eslint-disable no-unused-vars */
// 全局要用的类型放到这里

export type IResData<T> = {
  code: number
  msg: string
  result: T
}

export type IUserInfo = {
  nickname?: string
  avatar?: string
  /** 微信的 openid，非微信没有这个字段 */
  openid?: string
  token?: string
}

export enum TestEnum {
  A = 'a',
  B = 'b',
}
