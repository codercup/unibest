<route lang="json5">
{
  style: { navigationBarTitleText: '登录' },
}
</route>

<template>
  <view class="p-4">
    <view class="flex items-center leading-6" v-if="hasLogin">
      <image class="w-8 h-8 rounded-full" :src="userStore.userInfo?.avatar"></image>
      <view class="ml-2">{{ userStore.userInfo?.nickname }}</view>
    </view>
    <view class="flex items-center leading-6" v-else @click="onLogin">
      <view class="i-carbon-user-avatar"></view>
      <view class="ml-2">点击显示微信头像2</view>
    </view>

    <view v-if="showPrivacyModal">
      <view>隐私弹窗内容....</view>
      <button @tap="handleOpenPrivacyContract">查看隐私协议</button>
      <button
        id="agree-btn"
        open-type="agreePrivacyAuthorization"
        @agreeprivacyauthorization="handleAgreePrivacyAuthorization"
      >
        同意
      </button>
    </view>
    <fly-login v-model="showLoginModal" />
    <fly-content :line="10" />
    <button v-if="hasLogin" class="mt-2" @click="logout">退出登录</button>
  </view>
</template>

<script lang="ts" setup name="WxLogin">
import { useUserStore } from '@/store'

const showPrivacyModal = ref(false)
const showLoginModal = ref(false)
const onLogin = () => {
  wx.getPrivacySetting({
    success(res) {
      // 返回结果为: res = { needAuthorization: true/false, privacyContractName: '《xxx隐私保护指引》' }
      console.log(res)
      if (res.needAuthorization) {
        // 给出弹窗
        showPrivacyModal.value = true
      } else {
        // 用户已经同意过隐私协议，所以不需要再弹出隐私协议，也能调用已声明过的隐私接口
        showLoginModal.value = true
      }
    },
  })
}
const handleOpenPrivacyContract = () => {
  // 打开隐私协议页面
  wx.openPrivacyContract({
    success: () => {}, // 打开成功
    fail: () => {}, // 打开失败
    complete: () => {},
  })
}
const handleAgreePrivacyAuthorization = () => {
  // 用户同意隐私协议事件回调
  // 用户点击了同意，之后所有已声明过的隐私接口和组件都可以调用了
  showPrivacyModal.value = false
  showLoginModal.value = true
}

const userStore = useUserStore()
const hasLogin = computed(() => userStore.userInfo?.nickname)
const logout = () => {
  uni.showModal({
    title: '确认退出当前账号？',
    success: (res) => {
      if (res.confirm) {
        userStore.clearUserInfo()
      }
    },
  })
}
</script>
