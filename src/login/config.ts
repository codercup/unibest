export const LOGIN_STRATEGY_MAP = {
  BLACKLIST: 'BLACKLIST', // 黑名单策略，默认可以进入APP
  WHITELIST: 'WHITELIST', // 白名单策略，默认不可以进入APP，需要强制登录
}
// 登录策略，默认使用黑名单策略，即默认不需要登录就可以访问
export const LOGIN_STRATEGY = LOGIN_STRATEGY_MAP.WHITELIST

export const LOGIN_PAGE_LIST = ['/login/login', '/login/register']

// 排除在外的列表，白名单策略指白名单列表，黑名单策略指黑名单列表
export const EXCLUDE_LIST = [
  '/xxx/index',
]
