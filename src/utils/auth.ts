import Cookie from 'js-cookie'
import { isMpWeixin } from './platform'
/**
 * TokeKey的名字
 */
const TokenKey: string = 'token'

/**
 * 获取tokenKeyName
 * @returns tokenKeyName
 */
export const getTokenKey = (): string => {
  return TokenKey
}

/**
 * 是否登录，即是否有token，不检查Token是否过期和是否有效
 * @returns 是否登录
 */
export const isLogin = () => {
  return !!getToken()
}

/**
 * 获取Token
 * @returns 令牌
 */
export const getToken = () => {
  return getCookieMap<string>(getTokenKey())
}

/**
 * 设置Token
 * @param token 令牌
 */
export const setToken = (token: string) => {
  setCookieMap(getTokenKey(), token)
}
/**
 * 删除Token
 */
export const removeToken = () => {
  removeCookieMap(getTokenKey())
}

/**
 * 设置Cookie
 * @param key Cookie的key
 * @param value Cookie的value
 */
export const setCookieMap = (key: string, value: any) => {
  if (isMpWeixin) {
    uni.setStorageSync(key, value)
    return
  }
  Cookie.set(key, value)
}

/**
 * 获取Cookie
 * @param key Cookie的key
 * @returns Cookie的value
 */
export const getCookieMap = <T>(key: string) => {
  if (isMpWeixin) {
    return uni.getStorageSync(key) as T
  }
  return Cookie.get(key) as T
}

/**
 * 删除Cookie
 * @param key Cookie的key
 */
export const removeCookieMap = (key: string) => {
  if (isMpWeixin) {
    uni.removeStorageSync(key)
    return
  }
  Cookie.remove(key)
}
