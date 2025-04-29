# App 专题

## 1. 其他端正常，`App` 白屏

请检查 `useXxxStore` 的调用，需要在函数内部调用，而不是在函数外部调用。(估计是顶层调用的时候 `pinia` 没有初始化，导致的问题，`app` 端独有的问题。)

```ts
// 错误写法
const userStore = useUserStore()
function foo() {
  userStore.xxx
}
// 正确写法
function foo() {
  const userStore = useUserStore()
  userStore.xxx
}
```

## 2.unibest 的 `App` 模块配置

> 核心解决办法就是把 `manifest.json` 的内容搬运到 `manifest.config.ts` 中。

我们默认的的 `manifest.config.ts` 只包含了比较基础的 `uniapp` 配置，有的时候我们需要在打包 `app` 时在 `hbuilderx` 里面额外设置一些配置，那么就需要配置好后把 `manifest.json` 中的内容拷贝到 `manifest.config.ts` 中，后面运行就不会丢失了。

举例子，我在 `manifest.json` 里面配置了 2个模块配置，如下：
![alt text](image-18.png)

点击左侧下面的 `源码视图` 就可以看到增加了如下内容：
![alt text](image-18-2.png)

只需要把对应的内容拷贝到 `manifest.config.ts` 中的 `distribute.plugins` 里面即可。
