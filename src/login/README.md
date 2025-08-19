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

### EXCLUDE_PAGE_LIST
`EXCLUDE_PAGE_LIST` 表示排除的路由列表。

在 `默认无需登录策略： DEFAULT_NO_NEED_LOGIN` 中，只有路由在 `EXCLUDE_PAGE_LIST` 中，才需要登录，相当于黑名单。

在 `默认需要登录策略： DEFAULT_NEED_LOGIN` 中，只有路由在 `EXCLUDE_PAGE_LIST` 中，才不需要登录，相当于白名单。
