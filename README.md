<p align="center">
  <a href="https://github.com/codercup/unibest">
    <img width="160" src="./src/static/logo.svg">
  </a>
</p>

<h1 align="center">
  <a href="https://github.com/codercup/unibest" target="_blank">unibest - 最好的 uniapp 跨端解决方案</a>
</h1>

<div align="center">

[![GitHub Repo stars](https://img.shields.io/github/stars/codercup/unibest?style=flat&logo=github)](https://github.com/codercup/unibest)
[![GitHub forks](https://img.shields.io/github/forks/codercup/unibest?style=flat&logo=github)](https://github.com/codercup/unibest)
[![star](https://gitee.com/codercup/unibest/badge/star.svg?theme=dark)](https://gitee.com/codercup/unibest/stargazers)
[![fork](https://gitee.com/codercup/unibest/badge/fork.svg?theme=dark)](https://gitee.com/codercup/unibest/members)
![node version](https://img.shields.io/badge/node-%3E%3D18-green)
![pnpm version](https://img.shields.io/badge/pnpm-%3E%3D7.30-green)
![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/codercup/unibest)
![GitHub License](https://img.shields.io/github/license/codercup/unibest)

</div>

`unibest` 是一个 uniapp 跨端解决方案，由 `uniapp` + `Vue3` + `Ts` + `Vite4` + `UnoCss` + `VSCode`(可选 `webstorm`) 实现。它使用了最新的前端技术栈，无需依靠 `HBuilderX`，通过命令行方式运行 `web`、`小程序` 和 `App`。

`unibest` 内置了 `约定式路由`、`layout布局`、`请求封装`、`请求拦截`、`登录拦截`、`UnoCSS`、`i18n多语言` 等基础功能，提供了 `代码提示`、`自动格式化`、`统一配置`、`代码片段` 等辅助功能，让你编写 `uniapp` 拥有 `best` 体验 （ `unibest 的由来`）。

![](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<p align="center">
  <a href="https://codercup.github.io/unibest/" target="_blank">📱 在线预览</a>
  <span style="margin:0 10px;">|</span>
  <a href="https://codercup.github.io/unibest-docs/" target="_blank">📖 阅读文档</a>
</p>

## ✨ 特性

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) - 就是快！
- 🔥 最新语法 - `<script lang="ts" setup>` 语法
- 🎨 [UnoCSS](https://unocss.dev/) - 高性能且极具灵活性的即时原子化 CSS 引擎
- 😃 [UnoCSS Icons](https://unocss.dev/presets/icons) & [icones](https://icones.js.org/) - 海量图标供你选择
- 🍍 [pinia](https://pinia.vuejs.org/) & [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/) - 全端适配的全局数据管理
- 🗂 `uni.request` 请求封装 - 一键引入，快捷使用
- 📦 [组件自动化加载](./src/components) - 可配置化的组件加载方式，轻松加载组件
- 📥 [API 自动加载](https://github.com/antfu/unplugin-auto-import) - 直接使用 Composition API 无需引入
- 🎉 `v3` Code Snippets 加快你的页面生成
- 🦾 [TypeScript](https://www.typescriptlang.org/) & [ESLint](https://eslint.org/) & [stylelint](https://stylelint.io/) - 保证代码质量
- 🌈 [husky](https://typicode.github.io/husky/) & [lint-staged](https://github.com/lint-staged/lint-staged) + [commitlint](https://commitlint.js.org/) - 保证代码提交质量
- 💡 `ES6 import` 自动排序，`css 属性` 自动排序，增强编码一致性

- 🖥 `多环境` 配置分开，想则怎么配置就怎么配置

## 👍 业务功能

- [x] 页面下拉刷新（全局+局部）
- [x] 页面上拉加载
- [x] 导航栏返回 or 去首页
- [x] 导航栏渐变（微信+h5+App)
- [x] 自定义导航栏顶部机型适配
- [x] 微信小程序分享（好友+朋友圈）
- [x] 微信登录
- [ ] 非微信登录（h5 和 App)
- [ ] 微信一键登录（基于手机号）- 需要非个人认证用户
- [x] 微信小程序获取头像昵称+隐私协议
- [x] 微信小程序 vconsole 调试
- [x] 多语言模板
- [x] 页面悬浮球(floating bubble)
- [x] 多 tab 列表功能
- [x] 瀑布流
- [x] 路由拦截
- [x] 大转盘抽奖
- [x] 九宫格抽奖
- [ ] 仿`BOSS直聘`个人中心
- [ ] 仿华为商城个人中心
- [ ] 仿网易云音乐 APP（独立项目）
<p align="center">
<a href="https://cn.vuejs.org/" target="_blank">
      <img src="https://img.shields.io/badge/-Vue3-34495e?logo=vue.js" />
  </a>
  <a href="https://cn.vitejs.dev/" target="_blank">
      <img src="https://img.shields.io/badge/-Vite4-646cff?logo=vite&logoColor=white" />
  </a>
  <a href="https://www.typescriptlang.org/zh/" target="_blank">
      <img src="https://img.shields.io/badge/-TypeScript5-blue?logo=typescript&logoColor=white" />
  </a>
  <a href="https://eslint.org/" target="_blank">
      <img src="https://img.shields.io/badge/-ESLint8-4b32c3?logo=eslint&logoColor=white" />
  </a>
  <a href="https://stylelint.io/" target="_blank">
      <img src="https://img.shields.io/badge/-StyleLint16-4b32c3?logo=stylelint&logoColor=white" />
  </a>
  <a href="https://pnpm.io/" target="_blank">
      <img src="https://img.shields.io/badge/-pnpm8-F69220?logo=pnpm&logoColor=white" />
  </a>
  <a href="https://unocss.dev/" target="_blank">
      <img src="https://img.shields.io/badge/-UnoCSS-4d4d4d?logo=unocss" />
  </a>
  <a href="https://icones.js.org/" target="_blank">
      <img src="https://img.shields.io/badge/-icones-1769aa?logo=Iconify" />
  </a>
  <a href="https://ext.dcloud.net.cn/plugin?id=8559" target="_blank">
      <img src="https://svg.hamm.cn/badge.svg?key=Platform&value=uni-app"/>
  </a>
  </p>

## ⚙️ 环境

- node>=18
- pnpm>=7.30

## &#x1F4C2; 安装

执行 `pnpm i` 安装依赖

## 📦 运行（支持热更新）

- web平台： `pnpm dev:h5`, 然后打开 [http://localhost:9000/](http://localhost:9000/)。
- weixin平台：`pnpm dev:mp-weixin` 然后打开微信开发者工具，导入本地文件夹，选择本项目的`dist/dev/mp-weixin` 文件。
- APP平台：`pnpm dev:app`, 然后打开 `HBuilderX`，导入刚刚生成的`dist/dev/app` 文件夹，选择运行到模拟器(开发时优先使用)，或者运行的安卓/ios基座。

## 🔗 发布

- web平台： `pnpm build:h5`，打包后的文件在 `dist/build/h5`，可以放到web服务器，如nginx运行。如果最终不是放在根目录，可以在 `manifest.config.ts` 文件的 `h5.router.base` 属性进行修改。
- weixin平台：`pnpm build:mp-weixin`, 打包后的文件在 `dist/build/mp-weixin`，然后通过微信开发者工具导入，并点击右上角的“上传”按钮进行上传。
- APP平台：`pnpm build:app`, 然后打开 `HBuilderX`，导入刚刚生成的`dist/build/app` 文件夹，选择发行 - APP云打包。

## 📄 License

[MIT](https://opensource.org/license/mit/)

Copyright (c) 2024 菲鸽

## 📊 Github Star History

[![Star History Chart](https://api.star-history.com/svg?repos=codercup/unibest&type=Date)](https://star-history.com/#codercup/unibest&Date)

与其他几个同行库的对比

[![Star History Chart](https://api.star-history.com/svg?repos=codercup/unibest,Ares-Chang/uni-vitesse,uni-helper/vitesse-uni-app&type=Date)](https://star-history.com/#codercup/unibest&Ares-Chang/uni-vitesse&uni-helper/vitesse-uni-app&Date)

## 贡献者

由仓库直接生成：

<a href="https://github.com/codercup/unibest/graphs/contributors">
<img src="https://contrib.rocks/image?repo=codercup/unibest" />
</a>

## 💓 捐赠鼓励

开源不易，如果 `unibest` 对你有些帮助，可以请作者吃块糖果 ，算是对开源做出的一点点鼓励吧！

<p align='center'>
<img alt="special sponsor appwrite" src="./screenshots/pay-wx-2.png" width="300" style="margin-left:0px;">
<img alt="special sponsor appwrite" src="./screenshots/pay-wx.png" width="300" style="margin-left:2px;">
</p>

## 🤝 微信交流群

扫码进微信群，微信群7天过期，作者会定期维护，争取读者每次打开都是可用的。

①②③群已满，下面是④群：

<p align='center'>
<img alt="special sponsor appwrite" src="https://oss.laf.run/ukw0y1-site/wx-group.jpg" width="300" style="margin-left:0px;">
</p>
