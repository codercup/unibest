import pagesJson from '@/pages.json'

console.log(pagesJson)

/** 判断当前页面是否是tabbar页  */
export const getIsTabbar = () => {
  if (!pagesJson.tabBar) {
    return false
  }
  const pages = getCurrentPages()
  const currPath = pages.at(-1).route
  return !!pagesJson.tabBar.list.find((e) => e.pagePath === currPath)
}
