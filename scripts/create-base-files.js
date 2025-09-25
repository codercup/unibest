// 基础配置文件生成脚本
// 此脚本用于生成 src/manifest.json 和 src/pages.json 基础文件
// 由于这两个配置文件会被添加到 .gitignore 中，因此需要通过此脚本确保项目能正常运行
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 获取当前文件的目录路径（替代 CommonJS 中的 __dirname）
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const manifest = {
  'name': 'unibest',
  'appid': '__UNI__D1E5001',
  'description': '',
  'versionName': '1.0.0',
  'versionCode': '100',
  'transformPx': false,
  'app-plus': {
    usingComponents: true,
    nvueStyleCompiler: 'uni-app',
    compilerVersion: 3,
    splashscreen: {
      alwaysShowBeforeRender: true,
      waiting: true,
      autoclose: true,
      delay: 0,
    },
    modules: {},
    distribute: {
      android: {
        permissions: [
          '<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>',
          '<uses-permission android:name="android.permission.VIBRATE"/>',
          '<uses-permission android:name="android.permission.READ_LOGS"/>',
          '<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>',
          '<uses-feature android:name="android.hardware.camera.autofocus"/>',
          '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.CAMERA"/>',
          '<uses-permission android:name="android.permission.GET_ACCOUNTS"/>',
          '<uses-permission android:name="android.permission.READ_PHONE_STATE"/>',
          '<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>',
          '<uses-permission android:name="android.permission.WAKE_LOCK"/>',
          '<uses-permission android:name="android.permission.FLASHLIGHT"/>',
          '<uses-feature android:name="android.hardware.camera"/>',
          '<uses-permission android:name="android.permission.WRITE_SETTINGS"/>',
        ],
        minSdkVersion: 21,
        targetSdkVersion: 30,
        abiFilters: [
          'armeabi-v7a',
          'arm64-v8a',
        ],
      },
      ios: {},
      sdkConfigs: {},
      icons: {
        android: {
          hdpi: 'static/app/icons/72x72.png',
          xhdpi: 'static/app/icons/96x96.png',
          xxhdpi: 'static/app/icons/144x144.png',
          xxxhdpi: 'static/app/icons/192x192.png',
        },
        ios: {
          appstore: 'static/app/icons/1024x1024.png',
          ipad: {
            'app': 'static/app/icons/76x76.png',
            'app@2x': 'static/app/icons/152x152.png',
            'notification': 'static/app/icons/20x20.png',
            'notification@2x': 'static/app/icons/40x40.png',
            'proapp@2x': 'static/app/icons/167x167.png',
            'settings': 'static/app/icons/29x29.png',
            'settings@2x': 'static/app/icons/58x58.png',
            'spotlight': 'static/app/icons/40x40.png',
            'spotlight@2x': 'static/app/icons/80x80.png',
          },
          iphone: {
            'app@2x': 'static/app/icons/120x120.png',
            'app@3x': 'static/app/icons/180x180.png',
            'notification@2x': 'static/app/icons/40x40.png',
            'notification@3x': 'static/app/icons/60x60.png',
            'settings@2x': 'static/app/icons/58x58.png',
            'settings@3x': 'static/app/icons/87x87.png',
            'spotlight@2x': 'static/app/icons/80x80.png',
            'spotlight@3x': 'static/app/icons/120x120.png',
          },
        },
      },
    },
    compatible: {
      ignoreVersion: true,
    },
  },
  'quickapp': {},
  'mp-weixin': {
    appid: 'wxa2abb91f64032a2b',
    setting: {
      urlCheck: false,
      es6: true,
      minified: true,
    },
    usingComponents: true,
    optimization: {
      subPackages: true,
    },
  },
  'mp-alipay': {
    usingComponents: true,
    styleIsolation: 'shared',
    optimization: {
      subPackages: true,
    },
  },
  'mp-baidu': {
    usingComponents: true,
  },
  'mp-toutiao': {
    usingComponents: true,
  },
  'uniStatistics': {
    enable: false,
  },
  'vueVersion': '3',
  'h5': {
    router: {
      base: '/',
    },
  },
}

const pages = {
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^fg-(.*)': '@/components/fg-$1/fg-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)': 'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  tabBar: {
    custom: true,
    color: '#999999',
    selectedColor: '#018d71',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        text: '首页',
        pagePath: 'pages/index/index',
      },
      {
        text: '关于',
        pagePath: 'pages/about/about',
      },
      {
        text: '我的',
        pagePath: 'pages/me/me',
      },
    ],
  },
  pages: [
    {
      path: 'pages/index/index',
      type: 'home',
      style: {
        navigationStyle: 'custom',
        navigationBarTitleText: '首页',
      },
    },
    {
      path: 'pages/about/about',
      type: 'page',
      style: {
        navigationBarTitleText: '关于',
      },
      excludeLoginPath: false,
    },
    {
      path: 'pages/about/alova',
      type: 'page',
      style: {
        navigationBarTitleText: 'Alova 演示',
      },
    },
    {
      path: 'pages/login/login',
      type: 'page',
      style: {
        navigationBarTitleText: '登录',
      },
    },
    {
      path: 'pages/login/register',
      type: 'page',
      style: {
        navigationBarTitleText: '注册',
      },
    },
    {
      path: 'pages/me/me',
      type: 'page',
      style: {
        navigationBarTitleText: '我的',
      },
    },
  ],
  subPackages: [
    {
      root: 'pages-sub',
      pages: [
        {
          path: 'demo/index',
          type: 'page',
          style: {
            navigationBarTitleText: '分包页面',
          },
        },
      ],
    },
  ],
}

// 使用修复后的 __dirname 来解析文件路径
const manifestPath = path.resolve(__dirname, '../src/manifest.json')
const pagesPath = path.resolve(__dirname, '../src/pages.json')

// 确保 src 目录存在
const srcDir = path.resolve(__dirname, '../src')
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true })
}

// 如果 src/manifest.json 不存在，就创建它；存在就不处理，以免覆盖
if (!fs.existsSync(manifestPath)) {
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
}

// 如果 src/pages.json 不存在，就创建它；存在就不处理，以免覆盖
if (!fs.existsSync(pagesPath)) {
  fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2))
}
