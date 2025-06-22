/**
 * 将对象序列化为URL查询字符串，用于替代第三方的 qs 库，节省宝贵的体积
 * 支持基本类型值和数组，不支持嵌套对象
 * @param obj 要序列化的对象
 * @returns 序列化后的查询字符串
 */
export function stringifyQuery(obj: Record<string, any>): string {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj))
    return ''

  return Object.entries(obj)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      // 对键进行编码
      const encodedKey = encodeURIComponent(key)

      // 处理数组类型
      if (Array.isArray(value)) {
        return value
          .filter(item => item !== undefined && item !== null)
          .map(item => `${encodedKey}=${encodeURIComponent(item)}`)
          .join('&')
      }

      // 处理基本类型
      return `${encodedKey}=${encodeURIComponent(value)}`
    })
    .join('&')
}
