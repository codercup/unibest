<route lang="json5">
{
  layout: 'default',
  hide: true,
  style: { navigationBarTitleText: '页面悬浮球' },
}
</route>

<template>
  <view>
    <movable-area class="movable-area">
      <movable-view
        :style="`--size:${ballSize}px`"
        class="movable-view"
        direction="all"
        :x="x"
        :y="y"
        @change="onChange"
        @touchend.prevent="onTouchEnd"
      >
        <view class="w-full h-full rounded-full bg-green-400"></view>
      </movable-view>
    </movable-area>
    <view>页面其他元素</view>
    <view>可以正常触发点击事件吗？答案是可以的</view>
    <button @click="onClick">按钮</button>
    <view>{{ x }}</view>
    <view>{{ y }}</view>
    <view @click="onSet">点击设置</view>
  </view>
</template>

<script lang="ts" setup name="FloatingBubble">
const { windowHeight, windowWidth } = uni.getSystemInfoSync()

const ballSize = 60
const x = ref(windowWidth - ballSize) // 靠右侧
const y = ref(windowHeight - ballSize - 20) // 距离底部20px

const middleX = (windowWidth - ballSize) / 2

const onChange = (e) => {
  const { x: _x, y: _y } = e.detail
  x.value = _x
  y.value = _y
}
// TODO: 期望最终落点不靠左右两边时，会自动回到两边，有一定的动画效果
const onTouchEnd = (e) => {
  console.log('onTouchEnd', e)
  // TODO：为啥这里设置的不生效了，原生不会移动到设置的地方，onSet里面可以。这里直接执行onSet也不行
  // 这里被我解决了
  const tid = setTimeout(() => {
    if (x.value < middleX) {
      x.value = 0
    } else {
      x.value = windowWidth - ballSize
    }
    clearTimeout(tid)
  }, 0)
}

const onClick = () => {
  uni.showToast({
    title: 'yes',
    icon: 'none',
  })
}
const onSet = () => {
  x.value = 100
  y.value = 100
}
</script>

<style lang="scss">
.movable-area {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  pointer-events: none; // 设置area元素不可点击，则事件便会下移至页面下层元素
  .movable-view {
    width: var(--size);
    height: var(--size);
    pointer-events: auto; // 必须设置，否则无法点击
  }
}
</style>
