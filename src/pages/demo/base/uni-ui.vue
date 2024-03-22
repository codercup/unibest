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
    <uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0"
      >底部弹出 Popup 自定义圆角</uni-popup
    >
  </view>
</template>

<script>
export default {
  methods: {
    open() {
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open('top')
    },
  },
}
</script>
