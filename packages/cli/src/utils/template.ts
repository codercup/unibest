/* eslint-disable style/arrow-parens */
/* eslint-disable antfu/if-newline */
/* eslint-disable style/brace-style */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ejs from 'ejs'
import fs from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 模板处理工具类
 */
export class TemplateHandler {
  private templateRoot: string

  constructor() {
    this.templateRoot = path.resolve(__dirname, '../../templates')
  }

  /**
   * 获取基础模板路径
   */
  public getBaseTemplatePath(): string {
    return path.join(this.templateRoot, 'base')
  }

  /**
   * 获取UI库模板路径
   */
  public getUiTemplatePath(uiLibrary: string): string {
    return path.join(this.templateRoot, 'ui-templates', uiLibrary)
  }

  /**
   * 获取i18n模板路径
   */
  public getI18nTemplatePath(): string {
    return path.join(this.templateRoot, 'i18n')
  }

  /**
   * 渲染EJS模板
   */
  public async renderTemplate(templatePath: string, data: Record<string, any>): Promise<string> {
    const templateContent = await fs.readFile(templatePath, 'utf-8')
    return ejs.render(templateContent, data, {}) // 添加空对象作为第三个参数
  }

  /**
   * 复制模板文件到目标路径
   */
  public async copyTemplate(sourceDir: string, targetDir: string, data?: Record<string, any>): Promise<void> {
    // 确保目标目录存在
    await fs.ensureDir(targetDir)

    // 读取源目录中的所有文件
    const files = await fs.readdir(sourceDir)

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file)
      const targetPath = path.join(targetDir, file)
      const stats = await fs.stat(sourcePath)

      if (stats.isDirectory()) {
        // 递归复制子目录
        await this.copyTemplate(sourcePath, targetPath, data)
      } else if (file.endsWith('.ejs')) {
        // 渲染EJS模板
        const renderedContent = await this.renderTemplate(sourcePath, data || {})
        // 移除.ejs扩展名
        const actualTargetPath = targetPath.replace('.ejs', '')
        await fs.writeFile(actualTargetPath, renderedContent, 'utf-8')
      } else {
        // 直接复制文件
        await fs.copyFile(sourcePath, targetPath)
      }
    }
  }

  /**
   * 获取所有支持的UI库列表
   */
  public async getSupportedUiLibraries(): Promise<string[]> {
    const uiTemplatesDir = path.join(this.templateRoot, 'ui-templates')
    const exists = await fs.pathExists(uiTemplatesDir)
    if (!exists) return []

    const dirs = await fs.readdir(uiTemplatesDir)
    return dirs.filter(async dir => {
      const dirPath = path.join(uiTemplatesDir, dir)
      const stats = await fs.stat(dirPath)
      return stats.isDirectory()
    })
  }
}
