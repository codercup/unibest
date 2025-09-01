<script lang="ts" setup>
import { isApp, isAppAndroid, isAppHarmony, isAppIOS, isAppPlus, isH5, isMpWeixin, isWeb } from '@uni-helper/uni-env'
import { LOGIN_PAGE } from '@/router/config'
import { tabbarStore } from '@/tabbar/store'
import RequestComp from './components/request.vue'
import VBindCss from './components/VBindCss.vue'

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

// 浏览器打印 isH5为true, isWeb为false，大家尽量用 isH5
console.log({ isApp, isAppAndroid, isAppHarmony, isAppIOS, isAppPlus, isH5, isMpWeixin, isWeb })

function gotoLogin() {
  uni.navigateTo({
    url: `${LOGIN_PAGE}?redirect=${encodeURIComponent('/pages/about/about?a=1&b=2')}`,
  })
}

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

const uniKuRoot = ref()
// 结论：(同上）第一次通过onShow获取不到，但是可以通过 onReady获取到，后面就可以通过onShow获取到了
onReady(() => {
  console.log('onReady uniKuRoot exposeRef', uniKuRoot.value?.exposeRef)
})
onShow(() => {
  console.log('onShow uniKuRoot exposeRef', uniKuRoot.value?.exposeRef)
})
</script>

<template root="uniKuRoot">
  <view>
    <view class="mt-8 text-center text-xl text-gray-400">
      请求调用、unocss、static图片
    </view>
    <view class="my-2 text-center">
      <image src="/static/images/avatar.jpg" class="h-100px w-100px" />
    </view>
    <button class="mt-4 w-40 text-center" @click="gotoLogin">
      点击去登录页
    </button>
    <button class="mt-4 w-60 text-center" @click="setTabbarBadge">
      设置tabbarBadge
    </button>
    <RequestComp />
    <VBindCss />
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
