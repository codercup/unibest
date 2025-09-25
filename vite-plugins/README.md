# unibest原生插件资源复制插件

## 概述

`copy-native-resources.ts` 是一个专为 基于unibest框架的UniApp 项目设计的 Vite 插件，用于解决使用原生插件时打包后出现"插件找不到"的问题。该插件会在构建过程中自动将本地原生插件资源复制到正确的目标目录。

## 功能特性

- ✅ 自动复制原生插件资源到构建目录
- ✅ 支持环境变量控制插件启用/禁用
- ✅ 支持详细日志输出用于调试
- ✅ 智能检测源目录是否存在

## 目录结构

根据 [UniApp 官方文档](https://uniapp.dcloud.net.cn/plugin/native-plugin.html#%E6%9C%AC%E5%9C%B0%E6%8F%92%E4%BB%B6-%E9%9D%9E%E5%86%85%E7%BD%AE%E5%8E%9F%E7%94%9F%E6%8F%92%E4%BB%B6)，本地原生插件应存储在项目根目录的 `nativeplugins` 目录下：

```
项目根目录/
├── nativeplugins/                    # 原生插件存储目录（官方规范）
│   ├── HL-HHWUHFController/         # 示例：RFID 控制器插件
│   │   ├── android/                 # Android 平台资源
│   │   │   ├── libs/               # Android 库文件
│   │   │   └── res/                # Android 资源文件
│   │   ├── ios/                    # iOS 平台资源（如果有）
│   │   └── package.json            # 插件配置文件
│   └── 其他原生插件/
├── src/
├── vite-plugins/
│   ├── copy-native-resources.ts    # 本插件文件
│   └── README.md                   # 本文档
└── vite.config.ts
```

## 安装配置

### 1. 环境变量配置

在 `env/.env` 文件中添加以下配置：

```bash
# 是否启用原生插件资源复制
VITE_COPY_NATIVE_RES_ENABLE = true
```

### 2. Vite 配置

在 `vite.config.ts` 中引入并使用插件：

```typescript
import { createCopyNativeResourcesPlugin } from './vite-plugins/copy-native-resources'

export default defineConfig({
  plugins: [
    // 其他插件...
    
    // 原生插件资源复制插件
    createCopyNativeResourcesPlugin(
      UNI_PLATFORM === 'app' && VITE_COPY_NATIVE_RES_ENABLE === 'true',
      {
        verbose: mode === 'development', // 开发模式显示详细日志
      },
    ),
    
    // 其他插件...
  ],
})
```

### 3. manifest.config.ts 配置

在 `manifest.config.ts` 中配置原生插件：

```typescript
export default defineManifest({
  // 其他配置...
  
  'app-plus': {
    // 其他配置...
    
    // 原生插件配置
    nativePlugins: {
      // RFID 控制器插件示例
      'HL-HHWUHFController': {
        __plugin_info__: {
          name: 'HL-HHWUHFController',
          description: 'RFID UHF 控制器插件',
          platforms: 'Android',
          url: '',
          android_package_name: '',
          ios_bundle_id: '',
          isCloud: false,
          bought: -1,
          pid: '',
          parameters: {}
        }
      }
    }
  }
})
```

## 插件配置选项

```typescript
interface CopyNativeResourcesOptions {
  /** 是否启用插件 */
  enable?: boolean
  
  /** 
   * 源目录路径，相对于项目根目录
   * 默认为 'nativeplugins'，符合 UniApp 官方规范
   */
  sourceDir?: string
  
  /** 
   * 目标目录名称，构建后在 dist 目录中的文件夹名
   * 默认为 'nativeplugins'，与源目录保持一致
   */
  targetDirName?: string
  
  /** 是否显示详细日志 */
  verbose?: boolean
}
```

## 使用示例

### 基础使用

```typescript
// 使用默认配置
createCopyNativeResourcesPlugin(true)
```

### 自定义配置

```typescript
// 自定义配置
createCopyNativeResourcesPlugin(true, {
  sourceDir: 'nativeplugins',      // 源目录
  targetDirName: 'nativeplugins',  // 目标目录名
  verbose: true                    // 显示详细日志
})
```

### 条件启用

```typescript
// 仅在 app 平台且环境变量启用时生效
createCopyNativeResourcesPlugin(
  UNI_PLATFORM === 'app' && VITE_COPY_NATIVE_RES_ENABLE === 'true',
  { verbose: mode === 'development' }
)
```

## 工作原理

1. **构建时机**：插件在 Vite 的 `writeBundle` 阶段执行
2. **目录检测**：检查源目录 `nativeplugins` 是否存在
3. **资源复制**：将整个 `nativeplugins` 目录复制到构建输出目录
4. **路径处理**：自动处理不同平台的路径差异
5. **日志输出**：根据配置显示复制过程的详细信息

## 构建输出结构

插件会将原生插件资源复制到以下位置：

```
dist/
├── build/
│   └── app/
│       └── nativeplugins/          # 生产环境构建
│           └── HL-HHWUHFController/
└── dev/
    └── app/
        └── nativeplugins/          # 开发环境构建
            └── HL-HHWUHFController/
```

## 常见问题

### Q: 为什么要使用这个插件？

A: 目前使用unibest框架在打包时可能不会自动复制原生插件资源，导致运行时出现"插件找不到"的错误。此插件确保原生插件资源被正确复制到构建目录。

### Q: 插件不生效怎么办？

A: 检查以下几点：
1. 确认 `nativeplugins` 目录存在且包含插件文件
2. 确认环境变量 `VITE_COPY_NATIVE_RES_ENABLE` 设置为 `true`
3. 确认当前平台为 `app`（插件仅在 app 平台生效）
4. 开启 `verbose: true` 查看详细日志

### Q: 可以自定义源目录吗？

A: 可以，但不推荐。UniApp 官方规范要求使用 `nativeplugins` 目录，自定义可能导致其他问题。

### Q: 支持哪些平台？

A: 插件本身支持所有平台，但通常只在 `app` 平台（目前只测试了Android环境，iOS有条件的伙伴可以测试后反馈）使用原生插件。


### Q: 产生权限冲突问题？

A: 有伙伴反馈过接入的原生插件之前使用【Lastly1999】提交的版本初步解决了问题，但是又遇到两个新的问题：
- 导入的两个插件内的权限配置有版本冲突,在云打包的最后一步会报错,然后通过修改其中一个aar配置版本解决的。
- 测试发现在android版本大于12的手机，获取相册权限后，打开相册看不到里面的照片，将两个插件删除就没问题 ，可以正常显示，不删除就会有问题，怀疑是插件的AndroidManifest.xml覆盖了项目内manifest.config.ts的安卓权限申请
也欢迎其他有伙伴反馈，望能一起解决。

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础的原生插件资源复制功能

### v1.1.0
- 更新为符合 UniApp 官方规范的 `nativeplugins` 目录结构
- 修复 ESLint 警告
- 增加详细的代码注释和文档
- 优化错误处理和日志输出

## 技术支持

如果在使用过程中遇到问题，请检查：

1. UniApp 官方文档：[本地插件配置](https://uniapp.dcloud.net.cn/plugin/native-plugin.html#%E6%9C%AC%E5%9C%B0%E6%8F%92%E4%BB%B6-%E9%9D%9E%E5%86%85%E7%BD%AE%E5%8E%9F%E7%94%9F%E6%8F%92%E4%BB%B6)
2. 插件配置是否正确
3. 目录结构是否符合规范
4. 环境变量是否正确设置

## 特别声明及感谢

- 感谢【Lastly1999】，此插件时基于他pr的代码进行的还原和修改。[fix: app-plus、dev/prod、nativeResources插件未被正确移](https://gitee.com/feige996/unibest/commit/22e0bd5cfb47a4927373fe88be6809216f43d046)
- 感谢【菲鸽】造了这么好用的框架

