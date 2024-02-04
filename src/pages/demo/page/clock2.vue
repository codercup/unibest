<route lang="json5">
{
  layout: 'demo',
  style: { navigationBarTitleText: '动态时钟-抗锯齿' },
}
</route>

<template>
  <view class="mt-4 h-10 text-center">动态时钟</view>
  <view class="clock-box">
    <view class="clock" :style="{ '--ds': ds, '--dm': dm, '--dh': dh }">
      <view class="clock-pane">
        <text class="clock-num" :style="{ '--i': n }" v-for="n in 12" :key="n">{{ n }}</text>
      </view>
      <view class="clock-scales">
        <text class="clock-scale" :style="{ '--i': n }" v-for="n in 60" :key="n"></text>
      </view>

      <view class="clock-hour"></view>
      <view class="clock-min"></view>
      <view class="clock-sec"></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const d = new Date()
const h = d.getHours()
const m = d.getMinutes()
const s = d.getSeconds()
const ds = ref(s)
const dm = ref(m + s / 60)
const dh = ref(h + m / 60 + s / 3600)
</script>

<style lang="scss">
.clock-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.clock {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 350px;
  font-size: 24px;
  border-radius: 20px;
  box-shadow: 2px 2px 20px #0000001a;
  --step: 60s;
}

.clock-pane {
  position: absolute;
  width: 250px;
  height: 250px;
  transform: translateX(-125px);
}

.clock-scales {
  position: absolute;
  width: 250px;
  height: 250px;
  transform: translate(125px, -25px);
}

.clock-scale {
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 4px;
  background: #ccc;
  transform-origin: 0 150px;

  &:nth-child(5n + 1) {
    width: 4px;
    height: 6px;
    background: #333;
  }
}

@for $i from 1 through 60 {
  .clock-scale:nth-child(#{$i}) {
    transform: rotate(#{($i - 1) * 6deg});
  }
}

.clock-num {
  position: absolute;
  offset-path: path(
    'M250 125c0 69.036-55.964 125-125 125S0 194.036 0 125 55.964 0 125 0s125 55.964 125 125z'
  );
  offset-distance: calc(var(--i) * 10% / 1.2 - 25%);
  offset-rotate: 0deg;
}

.clock-hour {
  position: absolute;
  width: 4px;
  height: 60px;
  background: #333;
  transform: translateY(-50%) rotate(0);
  transform-origin: center bottom;
  animation: clock calc(var(--step) * 60 * 12) infinite linear;
  animation-delay: calc(-1 * var(--step) * var(--dh) * 60);
}

.clock-min {
  position: absolute;
  width: 4px;
  height: 90px;
  background: #333;
  transform: translateY(-50%) rotate(0);
  transform-origin: center bottom;
  animation: clock calc(var(--step) * 60) infinite linear;
  animation-delay: calc(-1 * var(--step) * var(--dm));
}

.clock-sec {
  position: absolute;
  width: 2px;
  height: 120px;
  background: red;
  transform: translateY(-50%) rotate(0);
  transform-origin: center bottom;
  animation: clock var(--step) infinite steps(60);
  animation-delay: calc(-1 * var(--step) * var(--ds) / 60);
}

.clock-sec::after {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 10px;
  height: 10px;
  content: '';
  background: #fff;
  border: 4px solid #333;
  border-radius: 50%;
  transform: translate(-50%, 50%);
}

@keyframes clock {
  to {
    transform: translateY(-50%) rotate(360deg);
  }
}
</style>
