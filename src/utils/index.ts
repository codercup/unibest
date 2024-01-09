import pagesJson from '@/pages.json'

console.log(pagesJson)

/** 判断当前页面是否是tabbar页  */
export const getIsTabbar = () => {
  if (!pagesJson.tabBar || !pagesJson.tabBar.list.length) {
    return false
  }
  const pages = getCurrentPages()
  const currPath = pages.at(-1).route
  console.log(currPath)
  return !!pagesJson.tabBar.list.find((e) => e.pagePath === currPath)
}
