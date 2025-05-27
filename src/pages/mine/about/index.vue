<route lang="json5">
{
  style: {
    navigationBarTitleText: '关于我们',
  },
}
</route>

<template>
  <view class="about-container">
    <view class="about-card">
      <!-- 应用信息 -->
      <view class="app-info">
        <view class="logo-wrapper">
          <wd-img :src="appLogo" width="120px" height="120px" radius="24rpx"></wd-img>
        </view>
        <view class="app-name">{{ appTitle }}</view>
        <view class="app-version">版本 {{ packageJson.version }}</view>
      </view>

      <!-- 联系方式 -->
      <view class="info-section">
        <view class="section-title">联系我们</view>
        <view class="section-content">
          <view class="contact-item">
            <wd-icon name="phone" size="20px" class="contact-icon"></wd-icon>
            <text class="contact-text">客服电话：400-XXX-XXXX</text>
          </view>
          <view class="contact-item">
            <wd-icon name="mail" size="20px" class="contact-icon"></wd-icon>
            <text class="contact-text">邮箱：support@unibest.tech</text>
          </view>
          <view class="contact-item">
            <wd-icon name="location" size="20px" class="contact-icon"></wd-icon>
            <text class="contact-text">地址：中国·深圳</text>
          </view>
        </view>
      </view>

      <!-- 版权信息 -->
      <view class="copyright">
        <text>Copyright © 2025-{{ currentYear }} {{ appTitle }}</text>
        <text>All Rights Reserved</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import packageJson from '@/../package.json'

const appTitle = ref(import.meta.env.VITE_APP_TITLE || 'unibest')
const appLogo = ref(import.meta.env.VITE_APP_LOGO || '/static/logo.svg')

// 当前年份
const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
.about-container {
  background-color: #f5f7fa;
  padding: 30rpx;
}

.about-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
  overflow: hidden;
  padding: 40rpx 30rpx;
}

/* 应用信息 */
.app-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30rpx 0 50rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.logo-wrapper {
  margin-bottom: 20rpx;
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.08);
  border-radius: 24rpx;
}

.app-name {
  font-size: 40rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 10rpx;
}

.app-version {
  font-size: 28rpx;
  color: #999;
}

/* 信息区块 */
.info-section {
  padding: 40rpx 0;
  border-bottom: 2rpx solid #f0f0f0;
}

.section-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 20rpx;
  position: relative;
  padding-left: 24rpx;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8rpx;
    height: 32rpx;
    background: linear-gradient(135deg, #4a7bff, #6a5acd);
    border-radius: 4rpx;
  }
}

.section-content {
  padding: 0 10rpx;
}

.content-text {
  font-size: 30rpx;
  color: #666;
  line-height: 1.6;
  text-align: justify;
}

/* 联系方式 */
.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.contact-icon {
  margin-right: 20rpx;
  color: #4a7bff;
}

.contact-text {
  font-size: 30rpx;
  color: #666;
}

/* 版权信息 */
.copyright {
  padding-top: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;

  text {
    font-size: 26rpx;
    color: #999;
    line-height: 1.6;
  }
}
</style>
