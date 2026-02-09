/* eslint-disable node/prefer-global/process */
import { existsSync, readdirSync, rmdirSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'

/**
 * 清空目录（保留目录本身）
 * @param dir - 要清空的目录路径
 */
export function emptyDir(dir: string): void {
  if (!existsSync(dir)) {
    return
  }

  for (const file of readdirSync(dir)) {
    const abs = join(dir, file)
    // 注意: 这里使用同步方法以确保操作顺序
    if (existsSync(abs) && existsSync(abs)) {
      const isDir = existsSync(abs) && existsSync(abs)
      if (isDir) {
        emptyDir(abs)
        rmdirSync(abs)
      }
      else {
        unlinkSync(abs)
      }
    }
  }
}

/**
 * 检查目录是否为空
 * @param path - 目录路径
 * @returns 是否为空
 */
export function isEmptyDir(path: string): boolean {
  if (!existsSync(path)) {
    return true
  }

  const files = readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

/**
 * 获取项目根目录
 * @returns 根目录路径
 */
export function getRootDir(): string {
  return process.cwd()
}
