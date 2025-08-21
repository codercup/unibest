/**
 * 把一个带查询参数的路由字符串解析为对象
 * @param query 要解析的查询字符串
 * @returns 解析后的对象
 */
export function parseQuery(query: string): Record<string, any> {
  if (!query)
    return {}

  // 处理 ? 前缀
  if (query.startsWith('?'))
    query = query.slice(1)

  return query.split('&').reduce((acc, cur) => {
    const [key, value] = cur.split('=')
    acc[key] = decodeURIComponent(value)
    return acc
  }, {} as Record<string, any>)
}

export function parseRouteStr(routeStr: string): Record<string, any> {
  if (!routeStr)
    return {}

  if (!routeStr.includes('?')) {
    return {
      path: routeStr,
    }
  }

  const [path, query] = routeStr.split('?')
  if (query) {
    return {
      path,
      query: parseQuery(query),
    }
  }

  return {
    path,
  }
}
