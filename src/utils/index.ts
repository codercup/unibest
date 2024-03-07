import pagesJson from '@/pages.json'
import { translate as t } from '@/locale/index'

console.log(pagesJson)

/** 判断当前页面是否是tabbar页  */
export const getIsTabbar = () => {
  if (!Object.keys(pagesJson).includes('tabBar')) {
    return false
  }
  const pages = getCurrentPages()
  const currPath = pages.at(-1).route
  return !!pagesJson.tabBar.list.find((e) => e.pagePath === currPath)
}

/**
 * test i18n in not .vue file
 */
export const testI18n = () => {
  console.log(t('app.name'))
  // 下面同样生效
  uni.showModal({
    title: 'i18n 测试',
    content: t('app.name'),
  })
}
/**
 * 获取当前页面路由的 path 路劲和 redirectPath 路径
 * path 如 ‘/pages/login/index’
 * redirectPath 如 ‘/pages/demo/base/route-interceptor’
 */
export const currRoute = () => {
  const pages = getCurrentPages()
  const currRoute = (pages.at(-1) as any).$page
  // console.log(currRoute)
  const { fullPath } = currRoute as { fullPath: string }
  console.log(fullPath) // eg: /pages/login/index?redirect=/pages/demo/base/route-interceptor (H5)
  // /pages/login/index?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor (小程序)
  const [path, query] = fullPath.split('?')
  console.log(path, query) // /pages/login/index redirect=/pages/demo/base/route-interceptor
  // /pages/login/index redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor
  // TODO: 根据业务，可能需要调整代码逻辑
  const redirectPath = query.split('redirect=')[1] // /pages/demo/base/route-interceptor
  return { path, redirectPath: decodeURIComponent(redirectPath) } // 这里需要统一 decodeURIComponent 一下，可以兼容h5和微信
}

/**
 * 得到所有的pages，包括主包和分包的
 * path 统一加 '/' 前缀
 */
export const getAllPages = () => {
  // 这里处理主包
  const pages = [
    ...pagesJson.pages.map((page) => ({
      ...page,
      path: `/${page.path}`,
    })),
  ]
  // 这里处理分包
  const subPages = []
  pagesJson.subPackages.forEach((subPageObj) => {
    console.log(subPageObj)
    const { root } = subPageObj
    console.log('root', root)

    subPageObj.pages.forEach((page) => {
      subPages.push({
        ...page,
        path: `/${root}/${page.path}`,
      })
    })
  })
  const result = [...pages, ...subPages]
  console.log('all pages: ', result)
  return result
}
/**
 * 得到所有的需要登录的pages，包括主包和分包的
 * 这里设计得通用一点，可以传递key作为判断依据，默认是 needLogin, 与 route-block 配对使用
 * PS: 这里为啥多写一个函数，主要是性能问题，这个函数性能好很多
 */
export const getAllPagesByKey = (key = 'needLogin') => {
  // 这里处理主包
  const pages = [
    ...pagesJson.pages
      .filter((page) => page[key])
      .map((page) => ({
        ...page,
        path: `/${page.path}`,
      })),
  ]
  // 这里处理分包
  const subPages = []
  pagesJson.subPackages.forEach((subPageObj) => {
    console.log(subPageObj)
    const { root } = subPageObj

    subPageObj.pages
      .filter((page) => page[key])
      .forEach((page) => {
        subPages.push({
          ...page,
          path: `/${root}/${page.path}`,
        })
      })
  })
  const result = [...pages, ...subPages]
  console.log('needLogin pages: ', result)
  return result
}

/**
 * 得到所有的需要登录的pages，包括主包和分包的
 * 只得到 path 数组
 */
export const getAllNeedLoginPages = (): string[] =>
  getAllPagesByKey('needLogin').map((page) => page.path)

/**
 * 得到所有的需要登录的pages，包括主包和分包的
 * 只得到 path 数组
 */
export const allNeedLoginPages: string[] = getAllPagesByKey('needLogin').map((page) => page.path)
