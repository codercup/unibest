export type UserInfo = {
  nickname?: string
  avatar?: string
  /** 微信的 openid，非微信没有这个字段 */
  openid?: string
  token?: string
}
export type UserItem = {
  username: string
  age: number
}
