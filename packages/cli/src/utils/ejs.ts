import { readFile } from 'node:fs/promises'
import ejs from 'ejs'
import { logger } from './logger'

/**
 * 渲染EJS模板文件
 * @param filePath - 模板文件路径
 * @param data - 模板数据
 * @returns 渲染后的内容
 */
export async function renderTemplate(filePath: string, data: Record<string, any>): Promise<string> {
  try {
    const templateContent = await readFile(filePath, 'utf8')
    return ejs.render(templateContent, data, {
      filename: filePath,
      async: true,
    })
  }
  catch (error) {
    logger.error(`渲染模板失败: ${filePath}`)
    throw error
  }
}
