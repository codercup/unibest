// 基础配置文件生成脚本
// 此脚本用于生成 src/manifest.json 和 src/pages.json 基础文件
// 由于这两个配置文件会被添加到 .gitignore 中，因此需要通过此脚本确保项目能正常运行
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 获取当前文件的目录路径（替代 CommonJS 中的 __dirname）
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 最简可运行配置
const manifest = { }
const pages = {
  pages: [
    {
      path: 'pages/index/index',
      type: 'home',
      style: {
        navigationStyle: 'custom',
        navigationBarTitleText: '首页',
      },
    },
    {
      path: 'pages/me/me',
      type: 'page',
      style: {
        navigationBarTitleText: '我的',
      },
    },
  ],
  subPackages: [],
}

// 使用修复后的 __dirname 来解析文件路径
const manifestPath = path.resolve(__dirname, '../src/manifest.json')
const pagesPath = path.resolve(__dirname, '../src/pages.json')

// 确保 src 目录存在
const srcDir = path.resolve(__dirname, '../src')
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true })
}

// 如果 src/manifest.json 不存在，就创建它；存在就不处理，以免覆盖
if (!fs.existsSync(manifestPath) || fs.statSync(manifestPath).size === 0) {
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
}

// 如果 src/pages.json 不存在，就创建它；存在就不处理，以免覆盖
if (!fs.existsSync(pagesPath) || fs.statSync(pagesPath).size === 0) {
  fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2))
}
