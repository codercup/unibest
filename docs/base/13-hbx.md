# hbx 模板

为了方便使用 `HBuilderX` 的开发者，`unibest` 也提供 `hbx` 模板。

`hbx 模板` 适用于 `2 类用户`

- 使用 `uniCloud` 云开发的用户，必须使用 `hbx 版本`，因为 `uniCloud` 跟 `HBuilderX` 是绑定的。
- 开发 `App` 的用户，可选使用 `hbx 版本`。

## 仓库地址

- gitee: [https://gitee.com/feige996/unibest-hbx.git](https://gitee.com/feige996/unibest-hbx.git)
- github: [https://github.com/feige996/unibest-hbx.git](https://github.com/feige996/unibest-hbx.git)

没有梯子的用户优先推荐使用 `gitee` 仓库，速度更快。（两个仓库会实时同步，无差别。）

## 导入项目

有 2 种方式导入项目：

- 从 `Git` 导入...
- 从本地目录导入...

## 运行项目

此时运行菜单会提示 `本项目类型无法运行`，如下图

![alt text](./assets/13-1.png)

![alt text](./assets/13-2.png)

需要执行如下 2 步：

- 项目下执行 `pnpm i`
- 右键项目，选择 `重新识别项目类型`

![alt text](./assets/13-3.png)

## 运行效果

经过上面的操作后，就可以正常运行了。

- ios 模拟器运行效果如下：

![alt text](./assets/13-4.png)

![alt text](./assets/13-5.png)

![alt text](./assets/13-6.png)

- 微信小程序运行效果如下：

![alt text](./assets/13-7.png)

> 目前微信小程序静态资源还有点问题，如下图 `logo 不见了`，后续会修复。

![alt text](./assets/13-8.png)

> 另外还发现 `UnoCSS Icon` 不生效，原因未知。

## 总结

本文描述了 `hbx` 模板的由来，使用方式。

有需要的可以试试，但是不太建议使用。另外精力有限，该模板不再维护。

全文完~
