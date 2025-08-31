/* eslint-disable import/no-mutable-exports */
// 获取屏幕边界到安全区域距离
let systemInfo
let safeAreaInsets

// #ifdef MP-WEIXIN
// 微信小程序使用新的API
systemInfo = uni.getWindowInfo()
safeAreaInsets = systemInfo.safeArea
  ? {
      top: systemInfo.safeArea.top,
      right: systemInfo.windowWidth - systemInfo.safeArea.right,
      bottom: systemInfo.windowHeight - systemInfo.safeArea.bottom,
      left: systemInfo.safeArea.left,
    }
  : null
// #endif

// #ifndef MP-WEIXIN
// 其他平台继续使用uni API
systemInfo = uni.getSystemInfoSync()
safeAreaInsets = systemInfo.safeAreaInsets
// #endif

console.log('systemInfo', systemInfo)
// 微信里面打印
// pixelRatio: 3
// safeArea: {top: 47, left: 0, right: 390, bottom: 810, width: 390, …}
// safeAreaInsets: {top: 47, left: 0, right: 0, bottom: 34}
// screenHeight: 844
// screenTop: 91
// screenWidth: 390
// statusBarHeight: 47
// windowBottom: 0
// windowHeight: 753
// windowTop: 0
// windowWidth: 390
export { safeAreaInsets, systemInfo }
