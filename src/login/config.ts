export const LOGIN_STRATEGY_MAP = {
  DEFAULT_NO_NEED_LOGIN: 0, // 黑名单策略，默认可以进入APP
  DEFAULT_NEED_LOGIN: 1, // 白名单策略，默认不可以进入APP，需要强制登录
}
// 登录策略，默认使用`无需登录策略`，即默认不需要登录就可以访问
export const LOGIN_STRATEGY = LOGIN_STRATEGY_MAP.DEFAULT_NO_NEED_LOGIN
export const isNeedLogin = LOGIN_STRATEGY === LOGIN_STRATEGY_MAP.DEFAULT_NEED_LOGIN

export const LOGIN_PAGE = '/pages/login/login'
export const LOGIN_PAGE_LIST = [LOGIN_PAGE, '/pages/login/register']

// 排除在外的列表，白名单策略指白名单列表，黑名单策略指黑名单列表
export const EXCLUDE_PAGE_LIST = [
  '/pages/xxx/index',
]
