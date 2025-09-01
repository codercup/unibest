/**
 * by 菲鸽 on 2025-08-19
 * 路由拦截，通常也是登录拦截
 * 黑白名单的配置，请看 config.ts 文件， EXCLUDE_LOGIN_PATH_LIST
 */
import { useTokenStore } from '@/store/token'
import { isPageTabbar, tabbarStore } from '@/tabbar/store'
import { getAllPages, getLastPage, HOME_PAGE, parseUrlToObj } from '@/utils/index'
import { EXCLUDE_LOGIN_PATH_LIST, isNeedLoginMode, LOGIN_PAGE } from './config'

export const FG_LOG_ENABLE = false
export function judgeIsExcludePath(path: string) {
  const isDev = import.meta.env.DEV
  if (!isDev) {
    return EXCLUDE_LOGIN_PATH_LIST.includes(path)
  }
  const allExcludeLoginPages = getAllPages('excludeLoginPath') // dev 环境下，需要每次都重新获取，否则新配置就不会生效
  return EXCLUDE_LOGIN_PATH_LIST.includes(path) || (isDev && allExcludeLoginPages.some(page => page.path === path))
}

export const navigateToInterceptor = {
  // 注意，这里的url是 '/' 开头的，如 '/pages/index/index'，跟 'pages.json' 里面的 path 不同
  // 增加对相对路径的处理，BY 网友 @ideal
  invoke({ url, query }: { url: string, query?: Record<string, string> }) {
    if (url === undefined) {
      return
    }
    let { path, query: _query } = parseUrlToObj(url)

    FG_LOG_ENABLE && console.log('\n\n路由拦截器:-------------------------------------')
    FG_LOG_ENABLE && console.log('路由拦截器 1: url->', url, ', query ->', query)
    const myQuery = { ..._query, ...query }
    // /pages/route-interceptor/index?name=feige&age=30
    FG_LOG_ENABLE && console.log('路由拦截器 2: path->', path, ', _query ->', _query)
    FG_LOG_ENABLE && console.log('路由拦截器 3: myQuery ->', myQuery)

    // 处理相对路径
    if (!path.startsWith('/')) {
      const currentPath = getLastPage()?.route || ''
      const normalizedCurrentPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`
      const baseDir = normalizedCurrentPath.substring(0, normalizedCurrentPath.lastIndexOf('/'))
      path = `${baseDir}/${path}`
    }

    // 处理直接进入路由非首页时，tabbarIndex 不正确的问题
    tabbarStore.setAutoCurIdx(path)

    const tokenStore = useTokenStore()
    FG_LOG_ENABLE && console.log('tokenStore.hasLogin:', tokenStore.hasLogin)

    // 不管黑白名单，登录了就直接去吧（但是当前不能是登录页）
    if (tokenStore.hasLogin) {
      if (path !== LOGIN_PAGE) {
        return true // 明确表示允许路由继续执行
      }
      else {
        console.log('已经登录，但是还在登录页', myQuery.redirect)
        const url = myQuery.redirect || HOME_PAGE
        if (isPageTabbar(url)) {
          uni.switchTab({ url })
        }
        else {
          uni.navigateTo({ url })
        }
        return true // 明确表示阻止原路由继续执行
      }
    }
    let fullPath = path

    if (myQuery) {
      fullPath += `?${Object.keys(myQuery).map(key => `${key}=${myQuery[key]}`).join('&')}`
    }
    const redirectUrl = `${LOGIN_PAGE}?redirect=${encodeURIComponent(fullPath)}`

    // #region 1/2 需要登录的情况(白名单策略) ---------------------------
    if (isNeedLoginMode) {
      // 需要登录里面的 EXCLUDE_LOGIN_PATH_LIST 表示白名单，可以直接通过
      if (judgeIsExcludePath(path)) {
        return true // 明确表示允许路由继续执行
      }
      // 否则需要重定向到登录页
      else {
        if (path === LOGIN_PAGE) {
          return true // 明确表示允许路由继续执行
        }
        FG_LOG_ENABLE && console.log('1 isNeedLogin(白名单策略) redirectUrl:', redirectUrl)
        uni.navigateTo({ url: redirectUrl })
        return false // 明确表示阻止原路由继续执行
      }
    }
    // #endregion 1/2 需要登录的情况(白名单策略) ---------------------------

    // #region 2/2 不需要登录的情况(黑名单策略) ---------------------------
    else {
      // 不需要登录里面的 EXCLUDE_LOGIN_PATH_LIST 表示黑名单，需要重定向到登录页
      if (judgeIsExcludePath(path)) {
        FG_LOG_ENABLE && console.log('2 isNeedLogin(黑名单策略) redirectUrl:', redirectUrl)

        // 如果当前路由是登录页，那就重定向走
        const { path, query } = parseUrlToObj(redirectUrl)
        if (path === LOGIN_PAGE) {
          console.log('path:', path)
          console.log('query:', query)
          uni.navigateTo({ url: query.redirect })
          return false // 明确表示阻止原路由继续执行
        }
        uni.navigateTo({ url: redirectUrl })
        return false // 修改为false，阻止原路由继续执行
      }
    }
    // #endregion 2/2 不需要登录的情况(黑名单策略) ---------------------------
    return true // 明确表示允许路由继续执行
  },
}

export const routeInterceptor = {
  install() {
    uni.addInterceptor('navigateTo', navigateToInterceptor)
    uni.addInterceptor('reLaunch', navigateToInterceptor)
    uni.addInterceptor('redirectTo', navigateToInterceptor)
    uni.addInterceptor('switchTab', navigateToInterceptor)
  },
}
