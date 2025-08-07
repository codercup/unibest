<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { navigateToInterceptor } from '@/router/interceptor'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

onLaunch((options) => {
  // #ifdef H5
  // 处理H5环境用户直接输入页面路由的情况：https://github.com/unibest-tech/unibest/issues/192
  console.log('App Launch', options?.path)
  navigateToInterceptor.invoke({ url: options?.path ?? '/' })
  // #endif
})
onShow(() => {
  console.log('App Show')
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
