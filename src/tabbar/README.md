# tabbar 说明

## tabbar 4种策略

`tabbar` 分为 `4 种` 情况：

- 0 `无 tabbar`，只有一个页面入口，底部无 `tabbar` 显示；常用语临时活动页。
- 1 `原生 tabbar`，使用 `switchTab` 切换 tabbar，`tabbar` 页面有缓存。
  - 优势：原生自带的 tabbar，最先渲染，有缓存。
  - 劣势：只能使用 2 组图片来切换选中和非选中状态，修改颜色只能重新换图片（或者用 iconfont）。
- 2 `有缓存自定义 tabbar`，使用 `switchTab` 切换 tabbar，`tabbar` 页面有缓存。使用了第三方 UI 库的 `tabbar` 组件，并隐藏了原生 `tabbar` 的显示。
  - 优势：可以随意配置自己想要的 `svg icon`，切换字体颜色方便。有缓存。可以实现各种花里胡哨的动效等。
  - 劣势：首次点击 tababr 会闪烁。
- 3 `无缓存自定义 tabbar`，使用 `navigateTo` 切换 `tabbar`，`tabbar` 页面无缓存。使用了第三方 UI 库的 `tabbar` 组件。
  - 优势：可以随意配置自己想要的 svg icon，切换字体颜色方便。可以实现各种花里胡哨的动效等。
  - 劣势：首次点击 `tababr` 会闪烁，无缓存。


> 注意：花里胡哨的效果需要自己实现，本模版不提供。

## tabbar 配置说明

- 如果使用的是原生tabbar, 则每个 `item` 需要配置 `path`、`text`、`iconPath`、`selectedIconPath` 等属性。
- 如果使用的是自定义tabbar, 则每个 `item` 需要配置 `path`、`text`、`icon` 、`iconType` 等属性（如果是local还需要配置2种图片）。

## 接口拿到tabbar列表怎么处理？

首先，接口的配置需要跟原生tabbar的 `path` 对应上。

然后，可以直接在 `index.vue` 文件请求接口拿到 `tabbarList`，然后赋值给 `tabbarList` 即可。

最后，如果用的是 `unocss` 图标，还需要在 `uno.config.ts` 的 `safelist` 中添加图标名称。