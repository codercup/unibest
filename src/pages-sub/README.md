# 分包配置

在 `vite.config.ts` 中进行配置。

```ts
import { defineConfig } from 'vite'
import UniPages from '@uni-helper/vite-plugin-uni-pages'

export default defineConfig({
  plugins: [
    UniPages({
      // ... 其他配置
      subPackages: [
        'src/pages-sub', // 是个数组，可以配置多个
      ],
    }),
  ],
})
```
