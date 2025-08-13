<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { navigateToInterceptor } from '@/router/interceptor'
import { tabbarStore } from './tabbar/store'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

onLaunch((options) => {
  // 处理直接进入页面路由的情况：如h5直接输入路由、微信小程序分享后进入等
  // https://github.com/unibest-tech/unibest/issues/192
  console.log('App Launch', options)
  if (options?.path) {
    navigateToInterceptor.invoke({ url: `/${options.path}` })
  }
  else {
    navigateToInterceptor.invoke({ url: '/' })
  }
  // 处理直接进入路由非首页时，tabbarIndex 不正确的问题
  tabbarStore.setAutoCurIdx(options.path)
})
onShow((options) => {
  console.log('App Show', options)
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
</style>
