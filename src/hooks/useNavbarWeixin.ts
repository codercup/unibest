import { onReady } from '@dcloudio/uni-app'
import { getIsTabbar, getLastItem } from '@/utils/index'

export default () => {
  // 获取页面栈
  const pages = getCurrentPages()
  const isTabbar = getIsTabbar()

  // 页面滚动到底部时的操作，通常用于加载更多数据
  const onScrollToLower = () => {}
  // 获取屏幕边界到安全区域距离
  const { safeAreaInsets } = uni.getSystemInfoSync()

  // #ifdef MP-WEIXIN
  // 基于小程序的 Page 类型扩展 uni-app 的 Page
  type PageInstance = Page.PageInstance & WechatMiniprogram.Page.InstanceMethods<any>
  // 获取当前页面实例，数组最后一项
  const pageInstance = getLastItem(getCurrentPages()) as PageInstance

  // 页面渲染完毕，绑定动画效果
  onReady(() => {
    // 动画效果,导航栏背景色
    pageInstance.animate(
      '.fly-navbar',
      [{ backgroundColor: 'transparent' }, { backgroundColor: '#f8f8f8' }],
      1000,
      {
        scrollSource: '#scroller',
        timeRange: 1000,
        startScrollOffset: 0,
        endScrollOffset: 50,
      },
    )
    // 动画效果,导航栏标题
    pageInstance.animate(
      '.fly-navbar .title',
      [{ color: 'transparent' }, { color: '#000' }],
      1000,
      {
        scrollSource: '#scroller',
        timeRange: 1000,
        startScrollOffset: 0,
        endScrollOffset: 50,
      },
    )
    // 动画效果,导航栏返回按钮
    pageInstance.animate('.fly-navbar .left-icon', [{ color: '#fff' }, { color: '#000' }], 1000, {
      scrollSource: '#scroller',
      timeRange: 1000,
      startScrollOffset: 0,
      endScrollOffset: 50,
    })
  })
  // #endif

  return {
    pages,
    isTabbar,
    onScrollToLower,
    safeAreaInsets,
  }
}
