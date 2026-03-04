# 开发者文档

## 调试

```sh
# 1. 启动监听模式（推荐，实时编译）
pnpm dev

# 2. 运行 CLI 命令（在另一个终端）
pnpm start -v
pnpm start my-project
pnpm start my-project -p h5,mp-weixin -u wot-ui -l -i
pnpm start my-project -u wot-ui -p h5,mp-weixin
pnpm start my-project -u uview-plus -l -i
pnpm start my-project -u none -p h5,app,mp-weixin
```

## 设计

支持交互式询问和命令行参数两种方式：

```sh
# 交互式
best my-project

# 命令行参数（静默/快捷）
best my-project -p h5,mp-weixin -u wot-ui -l -i
```

## 发布

发布使用 `release-it` 自动管理版本和发布：

```sh
# 1. 确保本地代码已提交
git add .
git commit -m "feat: some changes"

# 2. 运行发布命令（会自动更新版本号、生成 changelog、提交 tag 并发布到 npm）
pnpm release
```

如果需要手动发布：

```sh
# 1. 更新 package.json 版本号
npm version patch # 或 minor, major

# 2. 构建
pnpm build

# 3. 登录并发布
npm login --registry=https://registry.npmjs.org/
npm publish --registry=https://registry.npmjs.org/
```
