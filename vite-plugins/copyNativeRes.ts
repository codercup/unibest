import fs from 'fs-extra'
import path from 'path'

export function copyNativeRes() {
  const waitPath = path.resolve(__dirname, '../src/nativeResources')
  const buildPath = path.resolve(
    __dirname,
    '../dist',
    process.env.NODE_ENV === 'production' ? 'build' : 'dev',
    process.env.UNI_PLATFORM!,
    'nativeResources',
  )

  return {
    enforce: 'post',
    async writeBundle() {
      try {
        // 检查源目录是否存在
        const sourceExists = await fs.pathExists(waitPath)
        if (!sourceExists) {
          console.warn(`[copyNativeRes] 警告：源目录 "${waitPath}" 不存在，跳过复制操作。`)
          return
        }

        // 确保目标目录及中间目录存在
        await fs.ensureDir(buildPath)
        console.log(`[copyNativeRes] 确保目标目录存在：${buildPath}`)

        // 执行文件夹复制
        await fs.copy(waitPath, buildPath)
        console.log(
          `[copyNativeRes] 成功将 nativeResources 目录中的资源移动到构建目录：${buildPath}`,
        )
      } catch (error) {
        console.error(`[copyNativeRes] 复制资源失败：`, error)
      }
    },
  }
}
