# 登录 说明

## 登录 2种策略
- 默认无需登录策略： DEFAULT_NO_NEED_LOGIN
- 默认需要登录策略： DEFAULT_NEED_LOGIN

### 默认无需登录策略： DEFAULT_NO_NEED_LOGIN
进入任何页面都不需要登录，只有进入到黑名单中的页面/或者页面中某些动作需要登录，才需要登录。

比如大部分2C的应用，美团、今日头条、抖音等，都可以直接浏览，只有点赞、评论、分享等操作或者去特殊页面（比如个人中心），才需要登录。

### 默认需要登录策略： DEFAULT_NEED_LOGIN

进入任何页面都需要登录，只有进入到白名单中的页面，才不需要登录。默认进入应用需要先去登录页。

比如大部分2B和后台管理类的应用，比如企业微信、钉钉、飞书、内部报表系统、CMS系统等，都需要登录，只有登录后，才能使用。

### EXCLUDE_LOGIN_PATH_LIST
`EXCLUDE_LOGIN_PATH_LIST` 表示排除的路由列表。

在 `默认无需登录策略： DEFAULT_NO_NEED_LOGIN` 中，只有路由在 `EXCLUDE_LOGIN_PATH_LIST` 中，才需要登录，相当于黑名单。

在 `默认需要登录策略： DEFAULT_NEED_LOGIN` 中，只有路由在 `EXCLUDE_LOGIN_PATH_LIST` 中，才不需要登录，相当于白名单。

### excludeLoginPath
definePage 中可以通过 `excludeLoginPath` 来配置路由是否需要登录。(类似过去的 needLogin 的功能)

```ts
definePage({
  style: {
    navigationBarTitleText: '关于',
  },
  // 登录授权(可选)：跟以前的 needLogin 类似功能，但是同时支持黑白名单，详情请见 arc/router 文件夹
  excludeLoginPath: true,
  // 角色授权(可选)：如果需要根据角色授权，就配置这个
  roleAuth: {
    field: 'role',
    value: 'admin',
    redirect: '/pages/auth/403',
  },
})
```

## 登录注册页路由

登录页 `login.vue` 对应路由是 `/pages/login/login`.
注册页 `register.vue` 对应路由是 `/pages/login/register`.

## 登录注册页适用性

登录注册页主要适用于 `h5` 和 `App`，默认不适用于 `小程序`，因为 `小程序` 通常会使用平台提供的快捷登录。

特殊情况例外，如业务需要跨平台复用登录注册页时，也可以用在 `小程序` 上，所以主要还是看业务需求。

通过一个参数 `IS_USE_WX_LOGIN_IN_MP` 来控制是否在 `小程序` 中使用 `小程序` 默认的登录逻辑。
