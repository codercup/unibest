import { exec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

/**
 * 打开开发者工具
 */
function _openDevTools() {
  const platform = process.platform // darwin, win32, linux
  const { UNI_PLATFORM } = process.env //  mp-weixin, mp-alipay

  const uniPlatformText = UNI_PLATFORM === 'mp-weixin' ? '微信小程序' : UNI_PLATFORM === 'mp-alipay' ? '支付宝小程序' : '小程序'

  // 项目路径（构建输出目录）
  const projectPath = path.resolve(process.cwd(), `dist/dev/${UNI_PLATFORM}`)

  // 检查构建输出目录是否存在
  if (!fs.existsSync(projectPath)) {
    console.log(`❌ ${uniPlatformText}构建目录不存在:`, projectPath)
    return
  }

  console.log(`🚀 正在打开${uniPlatformText}开发者工具...`)

  // 根据不同操作系统执行不同命令
  let command = ''

  if (platform === 'darwin') {
    // macOS
    if (UNI_PLATFORM === 'mp-weixin') {
      command = `/Applications/wechatwebdevtools.app/Contents/MacOS/cli -o "${projectPath}"`
    }
    else if (UNI_PLATFORM === 'mp-alipay') {
      command = `/Applications/小程序开发者工具.app/Contents/MacOS/小程序开发者工具 --p "${projectPath}"`
    }
  }
  else if (platform === 'win32' || platform === 'win64') {
    // Windows
    if (UNI_PLATFORM === 'mp-weixin') {
      command = `"C:\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat" -o "${projectPath}"`
    }
  }
  else {
    // Linux 或其他系统
    console.log('❌ 当前系统不支持自动打开微信开发者工具')
    return
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`❌ 打开${uniPlatformText}开发者工具失败:`, error.message)
      console.log(`💡 请确保${uniPlatformText}开发者工具服务端口已启用`)
      console.log(`💡 可以手动打开${uniPlatformText}开发者工具并导入项目:`, projectPath)
      return
    }

    if (stderr) {
      console.log('⚠️ 警告:', stderr)
    }

    console.log(`✅ ${uniPlatformText}开发者工具已打开`)

    if (stdout) {
      console.log(stdout)
    }
  })
}

export default function openDevTools() {
  // 首次构建标记
  let isFirstBuild = true

  return {
    name: 'uni-devtools',
    writeBundle() {
      if (isFirstBuild && process.env.UNI_PLATFORM?.includes('mp')) {
        isFirstBuild = false
        _openDevTools()
      }
    },
  }
}
