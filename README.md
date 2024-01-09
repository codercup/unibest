# vue3-uniapp-template

## 特性

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) - 就是快！

- 📦 [组件自动化加载](./src/components)

- 📑 pinia+适用于多端的持久化方案

- 🎨 [UnoCSS](https://unocss.dev/) - 高性能且极具灵活性的即时原子化 CSS 引擎

- 😃 [UnoCSS Icons](https://unocss.dev/presets/icons), [海量图标-https://icones.js.org/](https://icones.js.org/)

- 🔥 使用 [新的 `<script setup>` 语法](https://github.com/vuejs/rfcs/pull/227)

- 📥 [API 自动加载](https://github.com/antfu/unplugin-auto-import) - 直接使用 Composition API 无需引入

- 🦾 [TypeScript](https://www.typescriptlang.org/) & [ESLint](https://eslint.org/) & [stylelint](https://stylelint.io/) - 保证代码质量

- 🗂 [husky](https://typicode.github.io/husky/) & [lint-staged](https://github.com/lint-staged/lint-staged) + [commitlint](https://commitlint.js.org/) - 保证代码提交质量

- 🗂 ES6 import 顺序自动排序，css 属性自动排序，增强编码一致性

- 🗂 使用请求拦截器，封装好您的请求

- 🗂 图片自动压缩，再也不用去tinyPng等网站压缩图片了

- 🗂 多环境配置分开，想则怎么配置就怎么配置

## 业务功能 TODO LIST

- [x] 页面下拉刷新
- [ ] 页面悬浮球(floating bubble)
- [x] 导航栏返回or去首页
- [x] 导航栏渐变（微信+h5)
- [x] 自定义导航栏顶部机型适配
- [x] 微信小程序分享（好友+朋友圈）
- [ ] 多tab列表功能
- [ ] 抽奖转盘

## 环境

- pnpm>=8.12
- node>=18

## 运行

- web平台： `pnpm dev:h5`, 然后打开 [http://localhost:9000/](http://localhost:9000/)。
- weixin平台：`pnpm dev:mp-weixin` 然后打开微信开发者工具，导入本地文件夹，选择本项目的`dist/dev/mp-weixin` 文件。

## 发布

- web平台： `pnpm build:h5`，打包后的文件在 `dist/build/h5`，可以放到web服务器，如nginx运行。如果最终不是放在根目录，可以在 `vite.config.ts` 的 `base` 属性进行配置。[vite官网](https://cn.vitejs.dev/config/shared-options.html#base)
  ![vite.base](./screenshots/vite-base.png)
- weixin平台：`pnpm build:h5`, 打包后的文件在 `dist/build/mp-weixin`，然后通过微信开发者工具导入，并点击右上角的“上传”按钮进行上传。

## app 打包成apk运行，页面空白

- `pnpm build:app`
- **注意，app运行完后不支持本地跑，就是说HBuildX打开生成的app文件夹也跑不了**
- 需要配置 `manifest.json`，有3个地方需要填，如下图
  ![app打包](./screenshots/build-app.png)
- 然后打开HBuildX--发行--原生APP云打包，然后出现如下图，按图填写即可。
  ![app打包](./screenshots/build-app2.png)
- 打包成功如下图
  ![app打包成功](./screenshots/build-app-success.png)
- 生成的apk路径
  ![app打包成功路径](./screenshots/build-app-success2.png)
- 运行报错如下图
  ![apk运行报错](./screenshots/run-app-error.png)
- 官方链接：[https://ask.dcloud.net.cn/article/35627](https://ask.dcloud.net.cn/article/35627)
- 安装历史版本的HBuildX: [https://hx.dcloud.net.cn/Tutorial/HistoryVersion](https://hx.dcloud.net.cn/Tutorial/HistoryVersion)，然后在百度云盘里面下载，下载HBuildX3.8.12的（因为本地的cli对应的HBuildX版本为3.8.12）
- 使用刚下载的旧版HBuildX云打包，一切顺利，但是最终打包的apk在手机安装后，运行出来的是白屏！（除了tabbar啥都么有，郁闷，PS：tabbar可以切换，但是都是空白页面）
  ![APP运行页面空白](./screenshots/run-app-error2.png)
