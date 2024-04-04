<route lang="json5">
{
  layout: 'demo',
  style: { navigationBarTitleText: 'UniUI 使用' },
}
</route>

<template>
  <uni-card>
    <text>这是一个基础卡片示例，内容较少，此示例展示了一个没有任何属性不带阴影的卡片。</text>
  </uni-card>
  <uni-badge text="99"></uni-badge>
  <uni-rate :value="3" />
  <view>
    <button @click="open">打开弹窗</button>
    <uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0">
      底部弹出 Popup 自定义圆角
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
const popup = ref()
const open = () => {
  popup.value?.open()
}
</script>
