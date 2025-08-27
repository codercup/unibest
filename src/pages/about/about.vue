<route lang="jsonc" type="page">
{
  "style": {
    "navigationBarTitleText": "关于"
  }
}
</route>

<script lang="ts" setup>
import { LOGIN_PAGE } from '@/router/config'
import { tabbarStore } from '@/tabbar/store'
import RequestComp from './components/request.vue'

// 奇怪：同样的代码放在 vue 里面不会校验到错误，放在 .ts 文件里面会校验到错误
// const testOxlint = (name: string) => {
//   console.log('oxlint')
// }
// testOxlint('oxlint')
console.log('about')

function toLogin() {
  uni.navigateTo({
    url: `${LOGIN_PAGE}?redirect=${encodeURIComponent('/pages/about/about')}`,
  })
}

function gotoAlova() {
  uni.navigateTo({
    url: '/pages/about/alova',
  })
}
function gotoVueQuery() {
  uni.navigateTo({
    url: '/pages/about/vue-query',
  })
}
function gotoSubPage() {
  uni.navigateTo({
    url: '/pages-sub/demo/index',
  })
}
// uniLayout里面的变量通过 expose 暴露出来后可以在 onReady 钩子获取到（onLoad 钩子不行）
const uniLayout = ref()
onLoad(() => {
  console.log('onLoad:', uniLayout.value) // onLoad: undefined
})
onReady(() => {
  console.log('onReady:', uniLayout.value) // onReady: Proxy(Object)
  console.log('onReady:', uniLayout.value.testUniLayoutExposedData) // onReady: testUniLayoutExposedData
})
// 结论：第一次通过onShow获取不到，但是可以通过 onReady获取到，后面就可以通过onShow获取到了
onShow(() => {
  console.log('onShow:', uniLayout.value) // onReady: Proxy(Object)
  console.log('onShow:', uniLayout.value?.testUniLayoutExposedData) // onReady: testUniLayoutExposedData
})

function gotoTabbar() {
  uni.switchTab({
    url: '/pages/index/index',
  })
}
// #region setTabbarBadge
function setTabbarBadge() {
  tabbarStore.setTabbarItemBadge(1, 100)
}
// #endregion

const uniKuRoot = ref()
// 结论：(同上）第一次通过onShow获取不到，但是可以通过 onReady获取到，后面就可以通过onShow获取到了
onReady(() => {
  console.log('onReady uniKuRoot exposeRef', uniKuRoot.value?.exposeRef)
})
onShow(() => {
  console.log('onShow uniKuRoot exposeRef', uniKuRoot.value?.exposeRef)
})

const testBindCssVariable = ref('red')
</script>

<template root="uniKuRoot">
  <view>
    <view class="mt-8 text-center text-xl text-gray-400">
      请求调用、unocss、static图片
    </view>
    <view class="my-2 text-center">
      <image src="/static/images/avatar.jpg" class="h-100px w-100px" />
    </view>
    <button class="mt-4 w-40 text-center" @click="toLogin">
      点击去登录页
    </button>
    <button class="mt-4 w-60 text-center" @click="setTabbarBadge">
      设置tabbarBadge
    </button>
    <RequestComp />
    <view class="test-css text-center">
      测试v-bind css变量
    </view>
    <view class="mb-6 h-1px bg-#eee" />
    <view class="text-center">
      <button type="primary" size="mini" class="w-160px" @click="gotoAlova">
        前往 alova 示例页面
      </button>
    </view>
    <view class="text-center">
      <button type="primary" size="mini" class="w-160px" @click="gotoTabbar">
        切换tabbar
      </button>
    </view>
    <view class="text-center">
      <button type="primary" size="mini" class="w-160px" @click="gotoVueQuery">
        vue-query 示例页面
      </button>
    </view>
    <view class="text-center">
      <button type="primary" size="mini" class="w-160px" @click="gotoSubPage">
        前往分包页面
      </button>
    </view>
    <view class="mt-6 text-center text-sm">
      <view class="inline-block w-80% text-gray-400">
        为了方便脚手架动态生成不同UI模板，本页的按钮统一使用UI库无关的原生button
      </view>
    </view>
    <view class="h-6" />
  </view>
</template>

<style lang="scss" scoped>
.test-css {
  color: v-bind(testBindCssVariable);
  font-size: 24px;
}
</style>
