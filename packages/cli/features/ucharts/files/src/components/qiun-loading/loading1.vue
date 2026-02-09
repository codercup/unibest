<template>
  <view class="container loading1">
    <view class="shape shape1"></view>
    <view class="shape shape2"></view>
    <view class="shape shape3"></view>
    <view class="shape shape4"></view>
  </view>
</template>

<script>
export default {
  name: 'loading1',
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

.container.loading1 {
  transform: rotate(45deg);
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

.loading1 .shape1 {
  animation: animation1shape1 0.5s ease 0s infinite alternate;
}

@keyframes animation1shape1 {
  from {
    transform: translate(0, 0);
  }

  to {
    transform: translate(16px, 16px);
  }
}

@keyframes animation1shape1 {
  from {
    transform: translate(0, 0);
  }

  to {
    transform: translate(16px, 16px);
  }
}

.loading1 .shape2 {
  animation: animation1shape2 0.5s ease 0s infinite alternate;
}

@keyframes animation1shape2 {
  from {
    transform: translate(0, 0);
  }

  to {
    transform: translate(-16px, 16px);
  }
}

@keyframes animation1shape2 {
  from {
    transform: translate(0, 0);
  }

  to {
    transform: translate(-16px, 16px);
  }
}

.loading1 .shape3 {
  animation: animation1shape3 0.5s ease 0s infinite alternate;
}

@keyframes animation1shape3 {
  from {
    transform: translate(0, 0);
  }

  to {
    transform: translate(16px, -16px);
  }
}

@keyframes animation1shape3 {
  from {
    transform: translate(0, 0);
  }

  to {
    transform: translate(16px, -16px);
  }
}

.loading1 .shape4 {
  animation: animation1shape4 0.5s ease 0s infinite alternate;
}

@keyframes animation1shape4 {
  from {
    transform: translate(0, 0);
  }

  to {
    transform: translate(-16px, -16px);
  }
}

@keyframes animation1shape4 {
  from {
    transform: translate(0, 0);
  }

  to {
    transform: translate(-16px, -16px);
  }
}
</style>
