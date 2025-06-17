// src/plugins/updatePackageJson.ts
import { Plugin } from 'vite'
import fs from 'fs/promises'
import path from 'path'

const updatePackageJson = (): Plugin => {
  return {
    name: 'update-package-json',
    async buildStart() {
      const packageJsonPath = path.resolve(process.cwd(), 'package.json')

      try {
        // 读取并解析 package.json
        const content = await fs.readFile(packageJsonPath, 'utf-8')
        const packageJson = JSON.parse(content)

        // 更新时间戳（使用 ISO 格式或自定义格式）
        packageJson['update-time'] = new Date().toISOString().split('T')[0] // YYYY-MM-DD

        // 写回文件（保持 2 空格缩进）
        await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8')

        console.log(`[update-package-json] 更新时间戳: ${packageJson['update-time']}`)
      } catch (error) {
        console.error('[update-package-json] 插件执行失败:', error)
      }
    },
  }
}

export default updatePackageJson
