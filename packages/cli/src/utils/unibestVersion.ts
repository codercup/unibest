import { promises as fs } from 'node:fs'
import os from 'node:os'
import { join } from 'node:path'
import fetch from 'node-fetch'

/**
 * 仓库文件响应接口（适用于Gitee和GitHub API）
 */
interface RepoFileResponse {
  content: string
  encoding: string
}

// 缓存文件路径（兼容旧版本，保留定义但不再使用）
function getCacheFilePath(): string {
  const homeDir = os.homedir()
  const cacheDir = join(homeDir, '.unibest', 'cache')
  return join(cacheDir, 'version.json')
}

/**
 * 获取 unibest 仓库的最新版本号（从Gitee获取，无缓存机制）
 * 每次调用都会直接请求Gitee API获取最新版本
 * @returns 版本号字符串或 null（如果获取失败）
 */
async function getUnibestVersionFromGitee(): Promise<string | null> {
  try {
    const apiUrl = `https://gitee.com/api/v5/repos/feige996/unibest/contents/package.json?ref=main`
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const data = (await response.json()) as RepoFileResponse
      const { content, encoding } = data

      if (encoding === 'base64') {
        // 使用 Node.js 内置的 Buffer 解码 base64 内容
        // eslint-disable-next-line node/prefer-global/buffer
        const decodedContent = Buffer.from(content, 'base64').toString('utf8')
        const packageJson = JSON.parse(decodedContent)
        return packageJson.version || null
      }
      else {
        // 不支持的编码格式
        return null
      }
    }
    else {
      // 请求失败
      return null
    }
  }
  catch (error) {
    // 网络错误或解析错误
    return null
  }
}

/**
 * 获取 unibest 仓库的最新版本号（从GitHub获取，无缓存机制）
 * 每次调用都会直接请求GitHub API获取最新版本
 * @returns 版本号字符串或 null（如果获取失败）
 */
async function getUnibestVersionFromGithub(): Promise<string | null> {
  try {
    const apiUrl = `https://api.github.com/repos/feige996/unibest/contents/package.json?ref=main`
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // GitHub API 要求 User-Agent 头
        'User-Agent': 'unibest-cli',
      },
    })

    if (response.ok) {
      const data = (await response.json()) as RepoFileResponse
      const { content, encoding } = data

      if (encoding === 'base64') {
        // 使用 Node.js 内置的 Buffer 解码 base64 内容
        // eslint-disable-next-line node/prefer-global/buffer
        const decodedContent = Buffer.from(content, 'base64').toString('utf8')
        const packageJson = JSON.parse(decodedContent)
        return packageJson.version || null
      }
      else {
        // 不支持的编码格式
        return null
      }
    }
    else {
      // 请求失败
      return null
    }
  }
  catch (error) {
    // 网络错误或解析错误
    return null
  }
}

/**
 * 清除版本缓存（兼容旧版本API，实际上已不再使用缓存）
 */
export async function clearVersionCache(): Promise<void> {
  try {
    const cachePath = getCacheFilePath()
    await fs.unlink(cachePath)
  }
  catch (error) {
    // 忽略文件不存在的错误
  }
}

// 同时导出两个版本获取函数，以便用户可以选择使用哪个
export { getUnibestVersionFromGitee, getUnibestVersionFromGithub }
