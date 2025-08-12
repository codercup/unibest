# API 和 HTTP 请求规范

## HTTP 请求封装
- 可以使用 `简单http` 或者 `alova` 或者 `@tanstack/vue-query` 进行请求管理
- HTTP 配置在 [src/http/](mdc:src/http/) 目录下
- `简单http` - [src/http/http.ts](mdc:src/http/http.ts)
- `alova` - [src/http/alova.ts](mdc:src/http/alova.ts)
- `vue-query` - [src/http/vue-query.ts](mdc:src/http/vue-query.ts)
- 请求拦截器在 [src/http/interceptor.ts](mdc:src/http/interceptor.ts)
- 支持请求重试、缓存、错误处理

## API 接口规范
- API 接口定义在 [src/api/](mdc:src/api/) 目录下
- 按功能模块组织 API 文件
- 使用 TypeScript 定义请求和响应类型
- 支持 `简单http`、`alova` 和 `vue-query` 三种请求方式


## 示例代码结构
```typescript
// API 接口定义
export interface LoginParams {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  userInfo: UserInfo
}

// alova 方式
export const login = (params: LoginParams) => 
  http.Post<LoginResponse>('/api/login', params)

// vue-query 方式
export const useLogin = () => {
  return useMutation({
    mutationFn: (params: LoginParams) => 
      http.post<LoginResponse>('/api/login', params)
  })
}
```

## 错误处理
- 统一错误处理在拦截器中配置
- 支持网络错误、业务错误、认证错误等
- 自动处理 token 过期和刷新
---
globs: src/api/*.ts,src/http/*.ts
---
