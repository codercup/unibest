/**
 * by 菲鸽 on 2024-03-06
 * 路由拦截，通常也是登录拦截
 * 可以设置路由白名单，或者黑名单，看业务需要选哪一个
 * 我这里应为大部分都可以随便进入，所以使用黑名单
 */
import { useUserStore } from '@/store'

const blackRoutes = ['/pages/demo/base/route-interceptor']
// TODO Check
const loginRoute = '/pages/login/index'

// 拦截器配置
const navigateToInterceptor = {
  // 注意，这里的url是 '/' 开头的，如 '/pages/index/index'，跟 'pages.json' 里面的 path 不同
  invoke({ url }: { url: string }) {
    console.log(url)
    const userStore = useUserStore()
    if (blackRoutes.includes(url)) {
      const isLogin = !!userStore.userInfo.token
      if (isLogin) {
        return true
      }
      const redirectRoute = `${loginRoute}?redirect=${url}`
      uni.navigateTo({ url: redirectRoute })
      return false
    }
    return true
  },
}

export const routeInterceptor = {
  install() {
    // 拦截 request 请求
    uni.addInterceptor('navigateTo', navigateToInterceptor)
  },
}
