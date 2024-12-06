# UI 库替换篇

## 默认 UI 库

`unibest` 经过几次更迭，先后使用 `uni-ui`、`uv-ui`作为默认 UI 库，目前使用 `wot-ui` 为默认 UI 库。

`wot-ui` 是 `vue3+ts` 编写的全端支持的 UI 库，编码体验比 `uv-ui` 更好；而官方维护的 `uni-ui` 则样式略丑，组件较少，故弃之。

> `wot-ui` 全称 `wot-design-uni`，是 `wot-design` 的 `uniapp` 版本，文档地址：[https://wot-design-uni.netlify.app/](https://wot-design-uni.netlify.app/).

---

很多群友反馈有其他 `UI` 库的需求，那么更换 `UI 库` 需要哪些步骤呢？

- 先卸载原有的 `wot-ui` 库
- 再安装其他 `UI 库`

下面我们简单描述一下更换 2 个主流 `UI库` —— `uni-ui` + `uv-ui` 的过程。

> 当然也支持同时存在多个 `UI 库`，有 ES 摇树特性，不必担心打包后的体积。

## 卸载 wot-ui 库

卸载 `wot-ui` 过程如下：

- 1. 删除 `wot-ui` 库：

```sh
  pnpm un wot-design-uni
```

- 2. `pages.config.ts` 文件 `easycom.custom` 删除相关配置：

```diff
easycom: {
    autoscan: true,
    custom: {
-     '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
    },
},
```

- 3. ` tsconfig.json` 文件 `compilerOptions.types` 删除相关配置：

```diff
"types": [
    "@dcloudio/types",
    "@types/wechat-miniprogram",
-   "wot-design-uni/global.d.ts",
    "./components.d.ts",
    "./global.d.ts"
]
```

## 安装 `uni-ui` 库

- 1. 安装 `uni-ui` 库：

```sh
pnpm add @dcloudio/uni-ui
```

- 2. `pages.config.ts` 文件 `easycom.custom` 添加相关配置：

```diff
easycom: {
  autoscan: true,
  custom: {
+   '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
  },
},
```

- 3. ` tsconfig.json` 文件 `compilerOptions.types` 添加相关配置：

```diff
"types": [
    "@dcloudio/types",
    "@types/wechat-miniprogram",
+   "@uni-helper/uni-ui-types",
    "./components.d.ts",
    "./global.d.ts"
]
```

## 安装 `uv-ui` 库

- 1. 安装 `uv-ui` 库：

```sh
pnpm add @climblee/uv-ui
```

- 2. `pages.config.ts` 文件 `easycom.custom` 添加相关配置：

```diff
easycom: {
  autoscan: true,
  custom: {
+   '^uv-(.*)': '@climblee/uv-ui/components/uv-$1/uv-$1.vue',
  },
},
```

- 3. ` tsconfig.json` 文件 `compilerOptions.types` 添加相关配置：

```diff
"types": [
  "@dcloudio/types",
  "@types/wechat-miniprogram",
+ "@ttou/uv-typings/shim",
+ "@ttou/uv-typings/v2",
  "./components.d.ts",
  "./global.d.ts"
]
```

> 其他 UI 库的安装类似，不再赘述。

全文完~
