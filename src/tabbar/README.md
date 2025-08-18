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

- 如果使用的是 `原生tabbar`，需要配置 `nativeTabbarList`，每个 `item` 需要配置 `path`、`text`、`iconPath`、`selectedIconPath` 等属性。
- 如果使用的是  `自定义tabbar`，需要配置 `customTabbarList`，每个 `item` 需要配置 `path`、`text`、`icon` 、`iconType` 等属性（如果是 `image` 图片还需要配置2种图片）。

## 文件说明

`config.ts` 专门配置 `nativeTabbarList` 和 `customTabbarList` 的相关信息，请按照文件里面的注释配置相关项。

使用 `原生tabbar` 时，不需要关心下面2个文件：
- `store.ts` ，专门给 `自定义 tabbar` 提供状态管理，代码几乎不需要修改。
- `index.vue` ，专门给 `自定义 tabbar` 提供渲染逻辑，代码可以稍微修改，以符合自己的需求。

