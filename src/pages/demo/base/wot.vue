<route lang="json5" type="page">
{
  layout: 'demo',
  style: {
    navigationBarTitleText: 'wot',
  },
}
</route>

<template>
  <view class="center pt-4 flex-col">
    <wd-button>主要按钮</wd-button>
    <wd-button type="success">成功按钮</wd-button>
    <wd-button type="info">信息按钮</wd-button>
    <wd-button type="warning">警告按钮</wd-button>
    <wd-button type="error">危险按钮</wd-button>
    <view class="h-10"></view>
    <wd-button @click="handleClick">展示幕帘</wd-button>
    <wd-curtain
      :value="value"
      :width="300"
      src="https://via.placeholder.com/400x200.png/3c9cff/fff"
      @close="handleClose"
    ></wd-curtain>
    <view class="mt-4">
      可以通过 unocss class 类改颜色，也可以通过 color 属性修改颜色，同时存在时以 color 为优先
    </view>
    <view class="mt-4">
      可以通过 unocss class 类改颜色，也可以通过 color 属性修改颜色，同时存在时以 color 为优先
    </view>
    <view class="flex m-4">
      <wd-icon name="add-circle"></wd-icon>
      <wd-icon name="add-circle" color="red"></wd-icon>
      <wd-icon class="text-green" name="add-circle"></wd-icon>
      <wd-icon class="text-green" name="add-circle" color="red"></wd-icon>
      <wd-icon class="text-green w-10 h-10" name="add-circle" color="red"></wd-icon>

      <wd-icon :name="iconName"></wd-icon>
    </view>

    <view @click="closeOutside" class="mt-4">
      <wd-popover v-model="show" content="popover content" @change="handleChange">
        <wd-button>点击展示</wd-button>
      </wd-popover>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useQueue } from 'wot-design-uni'

const { closeOutside } = useQueue()
const show = ref<boolean>(false)
function handleChange({ show }) {
  console.log(show)
}
const value = ref<boolean>(false)

function handleClick() {
  value.value = true
}

function handleClose() {
  value.value = false
}

const iconName = ref<string>('add-circle')
onLoad(() => {
  setTimeout(() => {
    iconName.value = 'check'
  }, 1000)
})
</script>

<style lang="scss" scoped>
//
</style>
