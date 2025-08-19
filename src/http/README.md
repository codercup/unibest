# 请求库

目前unibest支持3种请求库：
- 菲鸽简单封装的 `简单版本http`，路径（src/http/http.ts），对应的示例在 src/api/foo.ts
- `alova 的 http`，路径（src/http/alova.ts），对应的示例在 src/api/foo-alova.ts
- `vue-query`, 路径（src/http/vue-query.ts）, 目前主要用在自动生成接口，详情看(https://unibest.tech/base/17-generate)，示例在 src/service/app 文件夹

## 如何选择
如果您以前用过 alova 或者 vue-query，可以优先使用您熟悉的。
如果您的项目简单，简单版本的http 就够了，也不会增加包体积。（发版的时候可以去掉alova和vue-query，如果没有超过包体积，留着也无所谓 ^_^）

## roadmap
菲鸽最近在优化脚手架，后续可以选择是否使用第三方的请求库，以及选择什么请求库。还在开发中，大概月底出来（8月31号）。