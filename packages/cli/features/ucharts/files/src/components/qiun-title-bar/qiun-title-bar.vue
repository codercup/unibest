<template>
  <view class="qiun-title-bar">
    <view class="qiun-title-dot"></view>
    <view class="qiun-title-text">{{ title }}</view>
  </view>
</template>

<script>
export default {
  name: 'title-bar',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style>
.qiun-title-bar {
  display: flex;
  flex-direction: row !important;
  flex-wrap: nowrap;
  align-items: center;
  height: 40px;
}

.qiun-title-dot {
  width: 5px;
  height: 16px;
  margin-left: 8px;
  background-color: #409eff;
  border-radius: 10px;
}

.qiun-title-text {
  height: 22px;
  margin-left: 8px;
  font-size: 17px;
  font-weight: bold;
  line-height: 22px;
  color: #666;
}
</style>
