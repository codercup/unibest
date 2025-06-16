# SVG 篇

上一章《五、图标篇》主要介绍了 `内置图标` 的使用，今天带给大家本地 `SVG` 图标的使用。

> 注意：`小程序` 和 `APP` 都不支持 `SVG` 标签，只能通过 `image` 的方式使用。即下面的 `image + src` 方式。

- `image + src` 方式

  - `static目录` 图标
  - `相对目录` 图标
  - `线上地址` 图标

> PS：`小程序` 和 `APP` 对 `图片` 也是这面几种方式，下面统一称为 “图片”。

## `image + src` 方式

如果图片在项目里面，根据放的位置不同，分为 2 种：`static目录`图标 ， `相对目录`图标。

### 1. `static目录` 图标

这种方式直接编写代码即可，如下：

```html
<image src="/static/svg/demo.svg" mode="scaleToFill" class="h-20 w-20" />
```

### 2. `相对目录` 图标

这种方式需要先引入，再使用，代码编写如下：

```html
<script lang="ts" setup>
  import iconUrl from './demo.svg'
</script>

<template>
  <image :src="iconUrl" mode="scaleToFill" class="h-20 w-20" />
</template>
```

### 3. `线上地址` 图标

这种方式直接使用，代码编写如下：

```html
<template>
  <image src="https://xxx.com/demo.svg" mode="scaleToFill" class="h-20 w-20" />
</template>
```

## H5 额外支持的其他方式

> `SvgComponent` 方式 和 `SvgIcon` 方式，仅 `H5端` 适用，感兴趣的可以阅读下。
> 因为只有 `H5端` 支持，所以 unibest 没有引入这些，但是其他 `web` 项目可以参考。

:::details

### `SvgComponent` 方式

从 `Web端` 过来的同学都知道 `SvgComponent` 这种方式，只需要引入 `vite-svg-loader` 插件即可，支持 `3种` 方式引入 `svg`: `url`, `raw`, `component`。

- URL

SVGs can be imported as URLs using the `?url` suffix:

```js
import iconUrl from './my-icon.svg?url'
// 'data:image/svg+xml...'
```

Used in template:

```html
<template>
  <image :src="iconUrl" mode="scaleToFill" class="h-20 w-20" />
</template>
```

- Raw

SVGs can be imported as strings using the `?raw` suffix:

```js
import iconRaw from './my-icon.svg?raw'
// '<?xml version="1.0"?>...'
```

Used in template:

```html
<template>{{ iconRaw }}</template>
```

- Component

SVGs can be explicitly imported as Vue components using the `?component` suffix:

```js
import IconComponent from './my-icon.svg?component'
// <IconComponent />
```

Used in template:

```html
<template>
  <IconComponent />
</template>
```

但是目前经过测试，只有 `url` 的方式所有端可以使用，与上面的 `image + src - 相对目录 图标` 是一个效果。至于 `component` 只有 `H5端生效`，其他端不行。

### `SvgIcon` 方式

从 `Web端` 过来的同学都知道 `SvgIcon` 这种方式，只需要引入 `vite-plugin-svg-icons` 插件 + `vite 配置`，再编写一个通用的 `SvgIcon` 即可，但是同样只有 `H5端生效`，其他端不行。

`vite` 配置如下：

```
createSvgIconsPlugin({
  // 指定要缓存的文件夹
  iconDirs: [path.resolve(process.cwd(), 'src/assets')],
  // 指定symbolId格式
  symbolId: 'icon-[dir]-[name]',
}),
```

如上，只需要把 `svg` 放到 `src/assets` 目录即可。

`SvgIcon` 代码如下：

```html
<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup name="SvgIcon">
  const props = withDefaults(
    defineProps<{
      prefix?: string
      name: string
      color?: string
    }>(),
    {
      prefix: 'icon',
      name: '',
      color: '#333',
    },
  )
  const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
```

使用方式如下：

```html
<!-- src/assets/demo.svg -->
<SvgIcon name="demo" class="h-20 w-20"></SvgIcon>

<!-- src/assets/dir/demo.svg -->
<SvgIcon name="dir-demo" class="h-20 w-20"></SvgIcon>
```

> `SvgComponent` 依赖 `vite-svg-loader` 插件
>
> `SvgIcon` 依赖 `vite-plugin-svg-icons` 插件

:::

## 总结

适用于跨端的 `svg 和 图片` 的使用方式，只有 `image + src` 的方式。其他方式只能用于 `web` 端，仅供参考。

全文完~
