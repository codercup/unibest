# tabbar 说明

tabbar 分为4种情况：

- 完全原生tabbar，使用 switchTab 切换 tabbar，tabbar页面有缓存。
  - 优势：原生自带的tabbar，最先渲染，有缓存。
  - 劣势：只能使用2组图片来切换选中和非选中状态，修改颜色只能重新换图片（或者用iconfont）。
- 半自定义tabbar，使用 switchTab 切换 tabbar，tabbar页面有缓存。使用了第三方UI库的 tabbar 组件，并隐藏了原生 tabbar 的显示。
  - 优势：可以随意配置自己想要的 svg icon，切换字体颜色方便。有缓存。可以实现各种花里胡哨的动效等。
  - 劣势：首次点击tababr会闪烁。
- 全自定义tabbar，使用 navigateTo 切换tabbar，tabbar页面无缓存。使用了第三方UI库的 tabbar 组件。
  - 优势：可以随意配置自己想要的 svg icon，切换字体颜色方便。可以实现各种花里胡哨的动效等。
  - 劣势：首次点击tababr会闪烁，无缓存。
- 无tabbar，只有一个页面入口，底部无tabbar显示；常用语临时活动页。

> 注意：花里胡哨的效果需要自己实现，本模版不提供。
