import { log, spinner } from '@clack/prompts'
import { bold, red } from 'kolorist'

/**
 * 日志工具类，提供不同级别的日志输出（统一使用 @clack/prompts 风格）
 */
export const logger = {
  /** 普通信息日志 */
  info: (message: string) => {
    log.info(bold(message))
  },

  /** 成功日志 */
  success: (message: string) => {
    log.success(bold(message))
  },

  /** 错误日志 */
  error: (message: string) => {
    log.error(bold(message))
  },

  /** 警告日志 */
  warn: (message: string) => {
    log.warn(bold(message))
  },

  /** 提示日志 */
  tip: (message: string) => {
    log.info(bold(message))
  },

  /** 开始一个带有 spinner 的任务 */
  start: (message: string): { stop: (msg?: string) => void, fail: (msg?: string) => void } => {
    const s = spinner()
    s.start(bold(message))
    return {
      stop: (msg?: string) => s.stop(msg ? bold(msg) : undefined),
      fail: (msg?: string) => s.stop(msg ? bold(red(msg)) : undefined),
    }
  },
}
