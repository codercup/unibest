import { getAllPages } from '@/utils'

export const LOGIN_STRATEGY_MAP = {
  DEFAULT_NO_NEED_LOGIN: 0, // 黑名单策略，默认可以进入APP
  DEFAULT_NEED_LOGIN: 1, // 白名单策略，默认不可以进入APP，需要强制登录
}
// 登录策略，默认使用`无需登录策略`，即默认不需要登录就可以访问
export const LOGIN_STRATEGY = LOGIN_STRATEGY_MAP.DEFAULT_NEED_LOGIN
export const isNeedLoginMode = LOGIN_STRATEGY === LOGIN_STRATEGY_MAP.DEFAULT_NEED_LOGIN

export const LOGIN_PAGE = '/pages/login/login'
export const REGISTER_PAGE = '/pages/login/register'

export const LOGIN_PAGE_LIST = [LOGIN_PAGE, REGISTER_PAGE]

// 在 definePage 里面配置了 excludeLoginPath 的页面，功能与 EXCLUDE_LOGIN_PATH_LIST 相同
export const excludeLoginPathList = getAllPages('excludeLoginPath').map(page => page.path)

// 排除在外的列表，白名单策略指白名单列表，黑名单策略指黑名单列表
export const EXCLUDE_LOGIN_PATH_LIST = [
  '/pages/xxx/index',
  ...excludeLoginPathList, // 都是以 / 开头的 path
]

// 在微信小程序里面是否使用小程序默认的登录，默认为true
// 如果为 false 则复用 h5 的登录逻辑
export const IS_USE_WX_LOGIN_IN_MP = true // 暂时还没用到，没想好怎么整合
