# AGENTS.md - unibest Development Guide

## Project Overview

uniapp + Vue3 + TypeScript + Vite5 + UnoCSS template. Supports H5, WeChat Mini Program, App (Android/iOS/HarmonyOS).

## Architecture

```
unibest 仓库 (refactor/monorepo 分支)
└── packages/cli/           # CLI 脚手架工具
    └── 用户执行 pnpm create unibest 时，从 Git base 分支克隆模板
```

**模板来源：**
- 用户创建项目时，从 `https://gitee.com/feige996/unibest.git` 的 `base` 分支克隆
- CLI 工具本身不包含模板代码

## Essential Commands

```bash
# Development
pnpm dev              # H5 dev server
pnpm dev:h5           # H5 with hot reload
pnpm dev:mp           # WeChat Mini Program
pnpm dev:app          # App development

# Build
pnpm build            # Build current platform
pnpm build:h5         # H5 output (dist/build/h5)
pnpm build:mp         # WeChat MP (dist/build/mp-weixin)
pnpm build:app        # App output (dist/build/app)

# Lint & Type Check
pnpm lint             # ESLint
pnpm lint:fix         # ESLint auto-fix
pnpm type-check       # TypeScript check
```

## Code Style

### TypeScript
- Use explicit types for params and return values
- Prefix interfaces with `I`: `IUserInfoRes`, `ILoginForm`
- Use `import type` for types only

### Vue SFC
```vue
<script lang="ts" setup>
defineOptions({ name: 'PageName' })
definePage({ style: { navigationBarTitleText: 'Title' } })
</script>

<template>
  <!-- content -->
</template>

<style lang="scss" scoped>
/* styles */
</style>
```
- Order: template → script → style

### Imports
- Use `@/` alias for src imports: `import { http } from '@/http/http'`
- Group: external libs → Vue/UniApp → @/ → ../

### Naming
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `TabbarItem.vue` |
| Pages | kebab-case | `login/index.vue` |
| Stores | useXxxStore | `useUserStore` |
| API functions | camelCase | `getUserInfo` |
| Constants | UPPER_SNAKE_CASE | `VITE_SERVER_BASEURL` |

### Error Handling
```typescript
try {
  const res = await http.post('/auth/login', data)
  return res
}
catch (error) {
  uni.showToast({ title: 'Failed', icon: 'error' })
  throw error
}
```

### UnoCSS
- Use utility classes: `flex justify-center items-center px-4 pt-safe`
- Theme colors: `text-primary`, `bg-primary`
- Safe areas: `pt-safe`, `pb-safe`, `p-safe`

### API Design
```typescript
// Always specify response type
return http.get<IUserInfoRes>('/user/info')
return http.post<IAuthLoginRes>('/auth/login', data)
```

### Pinia Stores
```typescript
export const useUserStore = defineStore('user', () => {
  const userInfo = ref<IUserInfoRes>(initialState)
  const setUserInfo = (val: IUserInfoRes) => { ... }
  return { userInfo, setUserInfo }
}, { persist: true })
```

## File Structure
```
src/
├── api/           # API definitions
├── components/    # Vue components
├── hooks/         # Composable hooks
├── http/          # alova HTTP config
├── pages/         # Page components
├── store/         # Pinia stores
├── types/         # TypeScript types
└── utils/         # Utility functions
```

## ESLint
- Uses `@uni-helper/eslint-config`
- `console.log` allowed
- Run `pnpm lint:fix` before committing

## Important Notes
- Auto-imports enabled for Vue APIs and uni-app APIs
- Generated files: `src/service/`, `auto-import.d.ts`, `uni-pages.d.ts`
- Pages auto-generated from `src/pages/`
- App config in `manifest.config.ts`
