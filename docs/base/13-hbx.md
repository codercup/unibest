# hbx 模板

为了方便使用 `HBuilderX` 的开发者，`unibest` 也提供 `hbx` 模板。

`hbx 模板` 适用于 `2 类用户`

- ~~使用 `uniCloud` 云开发的用户，必须使用 `hbx 版本`，因为 `uniCloud` 跟 `HBuilderX` 是绑定的。~~
- 开发 `App` 的用户，可选使用 `hbx 版本`。

> 现在 `base` 模板已经完全可以替代 `hbx` 模板了，所以 `hbx` 模板不再维护。
>
> 1. `base` 模板一样可以使用 `uniCloud` 云开发。
> 2. `base` 模板支持 `App` 开发，并且也可以热更新，详情请见 [APP 专区](./18-app)。

## 仓库地址

> `hbx` 目前由 `青谷` 大佬维护，微信号：`qingguxixi`，[青谷 github 地址](https://github.com/Xiphin) 。

- gitee: [unibest-hbx](https://github.com/uni-run/unibest-hbx)
- github: [unibest-hbx](https://github.com/uni-run/unibest-hbx)

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
