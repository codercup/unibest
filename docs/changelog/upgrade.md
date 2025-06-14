# 升级指南

分为 `6` 部分的内容：

- `uniapp sdk 升级`
- `uni-helper 插件升级`
- `oxlint 升级`
- `移除 eslint, stylelint`
- `unocss 升级` (可选)
- `vscode  配置文件升级` (可选)

## uniapp sdk 升级

```sh
pnpm uvm  # 升级 uniapp sdk
# 如果以上命令不存在，请使用下面的
npx @dcloudio/uvm@latest
```

然后进入交互式的升级模式，按照提示进行升级。期间包管理器选择 `pnpm`。

升级完后，会自动引入 `vue-i18n`，不需要的可以删除它。（可选）

## uni-helper 插件升级

```sh
"@uni-helper/uni-types": "1.0.0-alpha.3",
"@uni-helper/unocss-preset-uni": "^0.2.11",
"@uni-helper/vite-plugin-uni-components": "0.2.0",
"@uni-helper/vite-plugin-uni-layouts": "0.1.10",
"@uni-helper/vite-plugin-uni-manifest": "0.2.8",
"@uni-helper/vite-plugin-uni-pages": "0.2.28",
"@uni-helper/vite-plugin-uni-platform": "0.0.4",
```

把你项目里面的 `package.json` 里面的相关依赖包版本改成上面的。然后执行 `pnpm i` 安装。

## oxlint 升级

```sh
pnpm add -D oxlint@v1.0.0  # 主要不要贪最新，最新的 v1.1.0 有问题，会报错。
```

`package.json` 里面的 `"lint-staged"` 内容改为：

```json
"lint-staged": {
    "**/*.{html,cjs,json,md,scss,css,txt}": [
      "prettier --write --cache"
    ],
    "**/*.{js,jsx,ts,tsx,vue,mjs,cjs,mts,cts}": [
      "oxlint --fix",
      "prettier --write --cache"
    ],
    "!**/{node_modules,dist}/**": []
},
```

`package.json` 里面的 `scripts` 添加：

```json
scripts: {
    // ... 其他
    "lint": "oxlint",
    "lint-fix": "oxlint --fix"
}
```

然后在项目根目录新建 `.oxlintrc.json` 文件，内容如下：

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": ["config:recommended"],
  "plugins": ["import", "typescript", "unicorn"],
  "rules": {
    "no-console": "off",
    "no-unused-vars": "off"
  },
  "env": {
    "es6": true
  },
  "globals": {
    "foo": "readonly"
  },
  "ignorePatterns": [
    "node_modules",
    "dist",
    "src/static/**",
    "src/uni_modules/**",
    "vite.config.ts",
    "uno.config.ts",
    "pages.config.ts",
    "manifest.config.ts"
  ],
  "settings": {},
  "overrides": [
    {
      "files": ["*.test.ts", "*.spec.ts"],
      "rules": {
        "@typescript-eslint/no-explicit-any": "off"
      }
    }
  ]
}
```

## 移除 eslint, stylelint

上面配置了 `oxlint` 后，`eslint` 不需要了，可以把 `依赖包` 和 `配置文件` 都都删除。

`stylelint` 可以保留也可以删除，因为几乎都是用 `unocss` 来写样式的，所以 `stylelint` 不要也可以。

## unocss 升级(可选)

有空再写，忙。

## vscode 配置文件升级

`.vscode/settings.json` 里面 `explorer.fileNesting.patterns` 配置如下：

```json
"explorer.fileNesting.patterns": {
  "README.md": "index.html,favicon.ico,robots.txt,CHANGELOG.md",
  "pages.config.ts": "manifest.config.ts,openapi-ts-request.config.ts",
  "package.json": "pnpm-lock.yaml,pnpm-workspace.yaml,LICENSE,.gitattributes,.gitignore,.gitpod.yml,CNAME,.npmrc,.browserslistrc",
  ".oxlintrc.json": "tsconfig.json,.commitlintrc.*,.prettier*,.editorconfig,.commitlint.cjs,.eslint*"
}
```
