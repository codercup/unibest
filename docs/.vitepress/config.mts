import dayjs from 'dayjs'
import { defineConfig } from 'vitepress'
import packageJson from '../../package.json'

const buildTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  base: '/',
  title: 'unibest 官方文档',
  description: '最好用的 uniapp 开发模板',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    // 增加构建信息
    ['meta', { name: 'build-time', content: buildTime }],
    ['meta', { name: 'version', content: packageJson.version }],
    [
      'meta',
      {
        name: 'keywords',
        content: 'unibest, uniapp, uni-app, vue, vue3, vite,template, typescript, ts',
      },
    ],
    [
      'meta',
      {
        name: 'author',
        content: '菲鸽, 菲哥, 鸽鸽, feige996, feige996, 1020103647@qq.com',
      },
    ],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'meta',
      {
        name: 'twitter:title',
        content: '最好用的 uniapp 开发模板',
      },
    ],
    // 添加 ICP 备案信息
    ['meta', { name: 'icp', content: '粤ICP备2024160998号' }],
    ['link', { rel: 'license', href: 'https://beian.miit.gov.cn/' }],
    // 其他杂七杂八的 meta 标签
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: 'feige996' }],
    [
      'meta',
      {
        name: 'twitter:image:src',
        content:
          'https://opengraph.githubassets.com/1cac1150838995e1f7d1643c00eee51a5d884f2054f995c9d3225b07b0eddb39/feige996/unibest',
      },
    ],
    [
      'meta',
      {
        property: 'og:image',
        content:
          'https://opengraph.githubassets.com/1cac1150838995e1f7d1643c00eee51a5d884f2054f995c9d3225b07b0eddb39/feige996/unibest',
      },
    ],
    [
      'meta',
      {
        property: 'og:image:alt',
        content: '最好用的 uniapp 开发模板',
      },
    ],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '600' }],
    ['meta', { property: 'og:site_name', content: 'GitHub' }],
    ['meta', { property: 'og:type', content: 'object' }],
    [
      'meta',
      {
        property: 'og:title',
        content: '最好用的 uniapp 开发模板',
      },
    ],
    ['meta', { property: 'og:url', content: 'https://github.com/feige996/unibest' }],
    [
      'meta',
      {
        property: 'og:description',
        content: '最好用的 uniapp 开发模板',
      },
    ],
    // 下面是百度统计代码
    ['script', { async: '', src: 'https://hm.baidu.com/hm.js?081c2ec121383d9e7d5a35c5833ab6ff' }],
    // 下面是不蒜子统计代码
    ['script', { async: '', src: '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' }],
  ],
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    siteTitle: 'unibest',
    nav: [
      {
        text: '快速开始',
        link: '/base/2-start',
        activeMatch: '/base',
      },
      {
        text: '🥤 打赏',
        link: '/advanced/rewards/rewards',
      },
      {
        text: '相关链接',
        link: '/other/links/links',
        activeMatch: '/other',
      },
    ],
    sidebar: [
      {
        text: '基础·必看',
        base: '/base/',
        items: [
          { text: '介绍', link: '1-introduction' },
          {
            text: '快速开始',
            link: '2-start',
          },
          { text: 'uni 插件', link: '3-plugin' },
          { text: '样式篇', link: '4-style' },
          { text: '图标篇', link: '5-icons' },
          { text: 'SVG篇', link: '6-svg' },
          { text: 'UI库选型篇', link: 'ui/ui' },
          { text: 'UI库替换篇', link: '7-ui' },
          { text: '请求篇', link: '8-request' },
          { text: '状态篇', link: '9-state' },
          { text: '多语言篇', link: '10-i18n' },
          { text: '运行发布', link: '11-build' },
          { text: '环境变量', link: '12-env' },
          { text: 'hbx 模板', link: '13-hbx' },
          { text: '常见问题', link: '14-faq' },
          { text: '常见问题2', link: '15-faq' },
          { text: '小程序标识', link: '16-terminology' },
          { text: '自动生成代码', link: '17-generate' },
          { text: 'App 专题', link: '18-app' },
          { text: '最佳实践', link: '20-best' },
        ],
      },
      {
        text: '社交',
        base: '/advanced/',
        items: [
          { text: '🥤 打赏', link: 'rewards/rewards' },
          { text: '微信交流群', link: 'wechat/wechat' },
          { text: '赞助榜', link: 'sponsor/sponsor' },
        ],
      },
      {
        text: '延伸',
        base: '/other/',
        items: [
          { text: '相关链接', link: 'links/links' },
          { text: '图片占位图', link: 'image/image' },
          { text: 'iconfont详细版', link: 'iconfont/iconfont' },
          { text: 'Git 提交优化', link: 'czg/czg' },
          { text: '文件资源展示优化', link: 'files/files' },
          { text: 'unibest博客', link: 'blog' },
        ],
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright (c) 2024 菲鸽',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/feige996/unibest' },
      {
        icon: {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0m6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/></svg>`,
        },
        link: 'https://gitee.com/feige996/unibest',
        ariaLabel: 'Gitee',
      },
      // #1f80ff 是掘金的 logo 的颜色
      {
        icon: {
          svg: `<svg  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2449" width="200" height="200">
          <path fill="#1f80ff" d="M465.189 161.792c-22.967 18.14-44.325 35.109-47.397 37.742l-5.851 4.68 10.971 8.632c5.998 4.827 11.85 9.508 13.02 10.532 1.17 1.024 17.993 14.336 37.156 29.696l34.962 27.795 5.267-3.95c2.925-2.194 23.259-18.432 45.348-35.986 21.943-17.555 41.253-32.768 42.716-33.646 1.609-1.024 2.779-2.194 2.779-2.78 0-0.438-9.655-8.63-21.504-17.846-11.995-9.363-22.674-17.847-23.845-18.871-15.945-13.02-49.737-39.059-50.76-39.059-0.586 0.147-19.896 14.922-42.862 33.061z m233.325 180.37C507.465 493.275 508.928 492.105 505.417 489.911c-3.072-1.902-11.556-8.485-64.073-50.03-9.07-7.168-18.578-14.775-21.358-16.823-2.78-2.194-8.777-6.875-13.312-10.532-4.68-3.657-10.679-8.339-13.312-10.533-13.165-10.24-71.095-56.027-102.107-80.457-5.852-4.681-11.41-8.485-12.142-8.485-0.731 0-10.971 7.754-22.674 17.116-11.703 9.508-22.674 18.286-24.284 19.456-1.755 1.17-5.12 3.95-7.46 6.144-2.34 2.34-4.828 4.096-5.413 4.096-3.072 0-0.731 3.072 6.437 8.777 4.096 3.218 8.777 6.875 10.094 8.046 1.316 1.024 10.24 8.045 19.748 15.506s23.26 18.286 30.428 23.99c19.31 15.215 31.89 25.308 127.853 101.084 47.836 37.742 88.796 69.779 90.844 71.095 3.657 2.487 3.95 2.487 7.46-0.292a1041.42 1041.42 0 0 0 16.092-12.727c6.875-5.413 14.775-11.703 17.554-13.897 30.135-23.699 80.018-63.05 81.774-64.512 1.17-1.024 12.434-9.802 24.868-19.603s37.888-29.696 56.32-44.324c18.579-14.629 46.227-36.425 61.733-48.567 15.506-12.142 27.794-22.528 27.502-23.26-0.878-1.17-57.637-47.104-59.978-48.274-0.731-0.439-18.578 12.727-39.497 29.257z"></path>
          <path fill="#1f80ff" d="M57.93 489.326c-15.215 12.288-28.527 23.405-29.697 24.576-2.34 2.194-5.412-0.44 80.018 66.852 33.207 26.185 32.622 25.747 57.637 45.495 10.386 8.192 36.279 28.672 57.783 45.495 38.18 30.135 44.91 35.401 52.663 41.545 2.048 1.756 22.967 18.14 46.372 36.572 23.26 18.432 74.167 58.514 112.933 89.088 38.912 30.573 71.095 55.734 71.826 56.027 0.732 0.293 7.46-4.389 14.921-10.386 21.797-16.97 90.259-70.949 101.523-79.872 5.705-4.535 12.873-10.24 15.945-12.58 3.072-2.488 6.436-5.12 7.314-5.852 0.878-0.878 11.85-9.509 24.283-19.31 20.773-16.091 59.1-46.226 64.366-50.615 1.17-1.024 5.12-4.096 8.777-6.875 3.657-2.78 7.9-6.29 9.509-7.607 1.609-1.317 14.775-11.703 29.257-23.113 29.11-22.82 42.277-33.207 88.503-69.632 17.262-13.605 32.475-25.454 33.646-26.478 2.486-2.048 31.451-24.869 44.617-35.255 4.827-3.657 9.07-7.168 9.508-7.607 0.44-0.585 5.998-4.827 12.435-9.8 6.436-4.828 13.165-10.24 15.067-11.85l3.365-2.926-9.948-7.753c-5.412-4.388-10.24-8.192-10.679-8.63-1.17-1.317-22.381-18.433-30.135-24.284-3.95-3.072-7.314-5.998-7.606-6.73-1.317-3.071-6.73 0.147-29.258 17.994-13.458 10.532-25.746 20.187-27.355 21.504-1.61 1.463-10.533 8.338-19.749 15.652-9.216 7.168-17.115 13.459-17.554 13.898-0.439 0.438-6.583 5.412-13.897 10.971-7.168 5.559-15.214 11.703-17.7 13.75-4.974 4.097-5.413 4.39-20.334 16.239-5.56 4.388-11.264 8.777-12.435 9.8-1.17 1.025-20.333 16.092-42.422 33.354-22.09 17.408-41.546 32.768-43.155 34.084-1.609 1.463-14.482 11.557-28.525 22.528s-40.814 32.037-59.539 46.812c-18.578 14.775-42.276 33.353-52.516 41.399s-23.26 18.285-28.965 22.82l-10.386 8.339-4.389-3.072c-2.34-1.756-4.68-3.511-5.12-3.95-0.439-0.439-4.973-4.096-10.24-8.046-11.849-9.216-14.482-11.264-16.676-13.166-0.878-0.877-4.243-3.51-7.46-5.851-3.22-2.487-6.145-4.681-6.584-5.12-0.439-0.439-6.875-5.705-14.482-11.703-7.607-5.851-14.921-11.556-16.091-12.58-1.317-1.17-17.116-13.605-35.255-27.795-17.993-14.19-35.109-27.648-38.035-29.842-5.705-4.681-33.499-26.624-125.074-98.743-34.523-27.209-72.704-57.344-84.846-66.852-49.737-39.498-55.15-43.594-56.905-43.447-0.877 0-14.043 10.24-29.257 22.528z" >
          </path>
          </svg>`,
        },
        link: 'https://juejin.cn/user/3263006241460792/posts',
        ariaLabel: '菲鸽的掘金主页',
      },
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                displayDetails: '显示详情',
                resetButtonTitle: '清除查询条件',
                backButtonTitle: '返回',
                noResultsText: '无法找到相关结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '选择',
                  navigateText: '切换',
                  navigateUpKeyAriaLabel: '切换',
                  navigateDownKeyAriaLabel: '切换',
                  closeText: '关闭',
                  closeKeyAriaLabel: '关闭',
                },
              },
            },
          },
        },
      },
    },
  },
})
