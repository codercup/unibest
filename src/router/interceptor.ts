/**
 * by 菲鸽 on 2024-03-06
 * 路由拦截，通常也是登录拦截
 * 可以设置路由白名单，或者黑名单，看业务需要选哪一个
 * 我这里应为大部分都可以随便进入，所以使用黑名单
 */
import { useUserStore } from '@/store'
import { tabbarStore } from '@/tabbar/store'
import { getLastPage } from '@/utils'
import { EXCLUDE_LIST, LOGIN_PAGE_LIST } from '../login/config'

// 黑名单登录拦截器 - （适用于大部分页面不需要登录，少部分页面需要登录）
export const navigateToInterceptor = {
  // 注意，这里的url是 '/' 开头的，如 '/pages/index/index'，跟 'pages.json' 里面的 path 不同
  // 增加对相对路径的处理，BY 网友 @ideal
  invoke({ url }: { url: string }) {
    console.log(url) // /pages/route-interceptor/index?name=feige&age=30
    if (url === undefined) {
      return
    }
    let path = url.split('?')[0]

    // 处理相对路径
    if (!path.startsWith('/')) {
      const currentPath = getLastPage()?.route || ''
      const normalizedCurrentPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`
      const baseDir = normalizedCurrentPath.substring(0, normalizedCurrentPath.lastIndexOf('/'))
      path = `${baseDir}/${path}`
    }

    // 处理直接进入路由非首页时，tabbarIndex 不正确的问题
    tabbarStore.setAutoCurIdx(path)

    if (LOGIN_PAGE_LIST.includes(path)) {
      console.log('000')
      return
    }

    const userStore = useUserStore()
    if (userStore.hasLogin) {
      return
    }

    console.log('拦截器中得到的 path:', path, userStore.hasLogin)

    if ([...EXCLUDE_LIST, ...LOGIN_PAGE_LIST].includes(path)) {
      console.log('111')
      uni.navigateTo({ url: path })
      return
    }
    console.log('222')
    const redirectUrl = `/pages/login/login?redirect=${encodeURIComponent(path)}`
    uni.navigateTo({ url: redirectUrl })
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
