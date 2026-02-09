<template>
  <view class="container loading6">
    <view class="shape shape1"></view>
    <view class="shape shape2"></view>
    <view class="shape shape3"></view>
    <view class="shape shape4"></view>
  </view>
</template>

<script>
export default {
  name: 'loading6',
  data() {
    return {}
  },
}
</script>
<style scoped="true">
.container {
  position: relative;
  width: 30px;
  height: 30px;
}

.container.loading6 {
  animation: rotation 1s infinite;
  animation: rotation 1s infinite;
}

.container.loading6 .shape {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.container .shape {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 1px;
}

.container .shape.shape1 {
  left: 0;
  background-color: #1890ff;
}

.container .shape.shape2 {
  right: 0;
  background-color: #91cb74;
}

.container .shape.shape3 {
  bottom: 0;
  background-color: #fac858;
}

.container .shape.shape4 {
  right: 0;
  bottom: 0;
  background-color: #e66;
}

.loading6 .shape1 {
  animation: animation6shape1 2s linear 0s infinite normal;
  animation: animation6shape1 2s linear 0s infinite normal;
}

@keyframes animation6shape1 {
  0% {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  25% {
    transform: translate(0, 18px);
    transform: translate(0, 18px);
  }

  50% {
    transform: translate(18px, 18px);
    transform: translate(18px, 18px);
  }

  75% {
    transform: translate(18px, 0);
    transform: translate(18px, 0);
  }
}

@keyframes animation6shape1 {
  0% {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  25% {
    transform: translate(0, 18px);
    transform: translate(0, 18px);
  }

  50% {
    transform: translate(18px, 18px);
    transform: translate(18px, 18px);
  }

  75% {
    transform: translate(18px, 0);
    transform: translate(18px, 0);
  }
}

.loading6 .shape2 {
  animation: animation6shape2 2s linear 0s infinite normal;
  animation: animation6shape2 2s linear 0s infinite normal;
}

@keyframes animation6shape2 {
  0% {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  25% {
    transform: translate(-18px, 0);
    transform: translate(-18px, 0);
  }

  50% {
    transform: translate(-18px, 18px);
    transform: translate(-18px, 18px);
  }

  75% {
    transform: translate(0, 18px);
    transform: translate(0, 18px);
  }
}

@keyframes animation6shape2 {
  0% {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  25% {
    transform: translate(-18px, 0);
    transform: translate(-18px, 0);
  }

  50% {
    transform: translate(-18px, 18px);
    transform: translate(-18px, 18px);
  }

  75% {
    transform: translate(0, 18px);
    transform: translate(0, 18px);
  }
}

.loading6 .shape3 {
  animation: animation6shape3 2s linear 0s infinite normal;
  animation: animation6shape3 2s linear 0s infinite normal;
}

@keyframes animation6shape3 {
  0% {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  25% {
    transform: translate(18px, 0);
    transform: translate(18px, 0);
  }

  50% {
    transform: translate(18px, -18px);
    transform: translate(18px, -18px);
  }

  75% {
    transform: translate(0, -18px);
    transform: translate(0, -18px);
  }
}

@keyframes animation6shape3 {
  0% {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  25% {
    transform: translate(18px, 0);
    transform: translate(18px, 0);
  }

  50% {
    transform: translate(18px, -18px);
    transform: translate(18px, -18px);
  }

  75% {
    transform: translate(0, -18px);
    transform: translate(0, -18px);
  }
}

.loading6 .shape4 {
  animation: animation6shape4 2s linear 0s infinite normal;
  animation: animation6shape4 2s linear 0s infinite normal;
}

@keyframes animation6shape4 {
  0% {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  25% {
    transform: translate(0, -18px);
    transform: translate(0, -18px);
  }

  50% {
    transform: translate(-18px, -18px);
    transform: translate(-18px, -18px);
  }

  75% {
    transform: translate(-18px, 0);
    transform: translate(-18px, 0);
  }
}

@keyframes animation6shape4 {
  0% {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  25% {
    transform: translate(0, -18px);
    transform: translate(0, -18px);
  }

  50% {
    transform: translate(-18px, -18px);
    transform: translate(-18px, -18px);
  }

  75% {
    transform: translate(-18px, 0);
    transform: translate(-18px, 0);
  }
}
</style>
