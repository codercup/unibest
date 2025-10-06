import type { Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

interface ManifestType {
  'plus'?: {
    distribute?: {
      plugins?: Record<string, any>
    }
  }
  'app-plus'?: {
    distribute?: {
      plugins?: Record<string, any>
    }
  }
}

export default function syncManifestPlugin(): Plugin {
  return {
    name: 'sync-manifest',
    apply: 'build',
    enforce: 'post',
    writeBundle: {
      order: 'post',
      handler() {
        const srcManifestPath = path.resolve(process.cwd(), './src/manifest.json')
        const distAppPath = path.resolve(process.cwd(), './dist/dev/app/manifest.json')

        try {
          // 读取源文件
          const srcManifest = JSON.parse(fs.readFileSync(srcManifestPath, 'utf8')) as ManifestType

          // 确保目标目录存在
          const distAppDir = path.dirname(distAppPath)
          if (!fs.existsSync(distAppDir)) {
            fs.mkdirSync(distAppDir, { recursive: true })
          }

          // 读取目标文件（如果存在）
          let distManifest: ManifestType = {}
          if (fs.existsSync(distAppPath)) {
            distManifest = JSON.parse(fs.readFileSync(distAppPath, 'utf8'))
          }

          // 如果源文件存在 plugins
          if (srcManifest['app-plus']?.distribute?.plugins) {
            // 确保目标文件中有必要的对象结构
            if (!distManifest.plus)
              distManifest.plus = {}
            if (!distManifest.plus.distribute)
              distManifest.plus.distribute = {}

            // 复制 plugins 内容
            distManifest.plus.distribute.plugins = srcManifest['app-plus'].distribute.plugins

            // 写入更新后的内容
            fs.writeFileSync(distAppPath, JSON.stringify(distManifest, null, 2))
            console.log('✅ Manifest plugins 同步成功')
          }
        }
        catch (error) {
          console.error('❌ 同步 manifest plugins 失败:', error)
        }
      },
    },
  }
}
