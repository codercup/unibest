/**
 * 本文件会在依赖包安装时执行，用以生成 `src/manifest.json`
 * 如果不存在 `src/manifest.json` 会运行报错，提示找不到 `src/manifest.json`
 * 如果中途自己删除了 'src/manifest.json' 文件，记得手动执行本文件，可以右键 `Run Code` 快速执行
 *
 * 本文件是为了兼容 window 系统才生成的
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

const filePath = './src/manifest.json'

if (fs.existsSync(filePath)) {
  // console.log(`${filePath}存在`)
} else {
  // console.log(`${filePath}不存在，需要创建`)
  fs.writeFile(filePath, '{}\n', {}, () => {
    // console.log(`${filePath}已经成功创建，并写入{}`)
  })
}
