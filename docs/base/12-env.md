# 环境变量

主要介绍 `vite` 环境变量和 `uni` 环境变量。

## `vite` 环境变量

`Vite` 在一个特殊的 `import.meta.env` 对象上暴露环境变量。环境变量定义在 `.env` 文件里。

### .env 文件

创建环境文件：

```yml
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略

# 注意 .env.local 无法覆盖 .env.[mode]
```

环境文件只包含环境变量的 `键值对` ：

```yml
VITE_SOME_KEY=123
DB_PASSWORD=foobar
```

> 为了防止意外地将一些环境变量泄漏到客户端，只有以 `VITE_` 为前缀的变量才会暴露给经过 `vite` 处理的代码。

如上配置，只有 `VITE_SOME_KEY` 会被暴露为 `import.meta.env.VITE_SOME_KEY` 提供给客户端源码，而 `DB_PASSWORD` 则不会。

```js
console.log(import.meta.env.VITE_SOME_KEY) // "123"
console.log(import.meta.env.DB_PASSWORD) // undefined
```

### mode 模式

Vite 允许你为不同的构建环境指定不同的模式。通常在 `npm scripts` 里面指定 `mode` 参数：

```sh
"scripts": {
    "dev": "uni",
    "dev-dev": "uni --mode development",
    "dev-test": "uni --mode test",
    "dev-prod": "uni --mode production",
}
```

运行不同模式的脚本时，`Vite` 会自动加载对应的 `.env.[mode]` 文件，就能获取到不同的环境变量。

`Vite` 运行 `dev` 时默认会加载 `.env.development` 文件（若有）。

`Vite` 运行 `build` 时默认会加载 `.env.production` 文件（若有）。

故，如上配置 `pnpm dev` 与 `pnpm dev-dev` 是一个效果。

## `uni` 环境变量

`uni` 环境变量这里指运行 `uni` 的平台变量，通过 `vite` 的 `define` 配置可以暴露出来。

```
define: {
  __UNI_PLATFORM__: JSON.stringify(UNI_PLATFORM),
},
```

代码里面使用：

```js
export const platform = __UNI_PLATFORM__
export const isH5 = __UNI_PLATFORM__ === 'h5'
export const isApp = __UNI_PLATFORM__ === 'app'
export const isMp = __UNI_PLATFORM__.startsWith('mp-')
const PLATFORM = {
  platform,
  isH5,
  isApp,
  isMp,
}
export default PLATFORM
```

## 总结

本文描写了 `vite` 环境变量和 `uni` 环境变量如何配置和使用。

全文完~
