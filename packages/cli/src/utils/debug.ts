/* eslint-disable node/prefer-global/process */
import { magenta } from 'kolorist'

/**
 * 调试日志工具函数
 * 只在开发环境下输出带[debug]前缀的日志
 * @param args 要打印的日志内容
 */
export function debug(...args: any[]): void {
  // 从process.env获取环境变量，确保在不同运行方式下都能正常工作
  const isDev = process.env.NODE_ENV === 'development'

  if (isDev) {
    // 使用magenta颜色为[debug]前缀添加醒目的颜色
    const debugPrefix = magenta('[debug]')
    console.log(debugPrefix, ...args)
  }
}
