<route lang="json5">
{
  style: {
    navigationBarTitleText: '个人资料',
  },
}
</route>

<template>
  <view class="profile-info-container">
    <view class="profile-card">
      <view class="form-wrapper">
        <wd-form ref="formRef" :model="formData" label-width="160rpx" class="profile-form">
          <wd-cell-group class="form-group">
            <!-- 昵称 -->
            <view class="sex-field">
              <text class="field-label">昵称</text>
              <wd-input
                prop="name"
                clearable
                v-model="formData.name"
                placeholder="请输入昵称"
                :rules="[{ required: true, message: '请填写昵称' }]"
                class="form-input"
              />
            </view>

            <!-- 性别 -->
            <view class="sex-field">
              <text class="field-label">性别</text>
              <wd-radio-group
                v-model="formData.sex"
                shape="button"
                :rules="[{ required: true, message: '请选择性别' }]"
              >
                <wd-radio :value="'1'">男</wd-radio>
                <wd-radio :value="'0'">女</wd-radio>
              </wd-radio-group>
            </view>
          </wd-cell-group>
        </wd-form>

        <!-- 操作按钮 -->
        <view class="form-actions">
          <wd-button type="primary" size="large" @click="handleSubmit">保存修改</wd-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'
import { toast } from '@/utils/toast'
import { updateInfo } from '@/api/login'

// 表单引用
const formRef = ref()

// 用户信息
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

// 表单数据
const formData = ref({
  id: userInfo.value.id,
  name: userInfo.value.name,
  sex: userInfo.value.sex,
})

// 提交表单
const handleSubmit = async () => {
  // 表单验证
  const valid = await formRef.value.validate()
  if (!valid) return
  const { message } = await updateInfo(formData.value)
  await useUserStore().getUserInfo()
  toast.success(message)
}
</script>

<style lang="scss" scoped>
.profile-info-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 30rpx;
}

.profile-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.card-header {
  padding: 40rpx 30rpx 20rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.card-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  position: relative;
  display: inline-block;
  padding-bottom: 16rpx;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60rpx;
    height: 6rpx;
    background: linear-gradient(90deg, #4a7bff, #6a5acd);
    border-radius: 6rpx;
  }
}

.form-wrapper {
  padding: 30rpx;
}

.form-group {
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 40rpx;
}

.form-input {
  font-size: 30rpx;
}

.sex-field {
  display: flex;
  align-items: center;
  padding: 24rpx 30rpx;
  background-color: #ffffff;
}

.field-label {
  width: 160rpx;
  font-size: 30rpx;
  color: #333;
}

.radio-group {
  flex: 1;
  display: flex;
  gap: 20rpx;
}

.radio-btn {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  font-size: 30rpx;
  border-radius: 12rpx;
  background-color: #f5f7fa;

  &:active {
    opacity: 0.8;
  }
}

.form-actions {
  display: flex;
  flex-direction: row;
  gap: 20rpx;
}

.submit-btn {
  height: 90rpx;
  border-radius: 45rpx;
  font-size: 32rpx;
  font-weight: 500;
  background: linear-gradient(135deg, #4a7bff, #6a5acd);
  box-shadow: 0 8rpx 16rpx rgba(74, 123, 255, 0.2);
  transition: all 0.3s ease;

  &:active {
    transform: translateY(2rpx);
    box-shadow: 0 4rpx 8rpx rgba(74, 123, 255, 0.15);
  }
}
</style>
