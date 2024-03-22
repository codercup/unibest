<template>
  <view class="container loading2">
    <view class="shape shape1"></view>
    <view class="shape shape2"></view>
    <view class="shape shape3"></view>
    <view class="shape shape4"></view>
  </view>
</template>

<script>
export default {
  name: 'loading2',
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

.container.loading2 {
  transform: rotate(10deg);
  transform: rotate(10deg);
}

.container.loading2 .shape {
  border-radius: 5px;
}

.container.loading2 {
  animation: rotation 1s infinite;
  animation: rotation 1s infinite;
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

.loading2 .shape1 {
  animation: animation2shape1 0.5s ease 0s infinite alternate;
  animation: animation2shape1 0.5s ease 0s infinite alternate;
}

@keyframes animation2shape1 {
  from {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  to {
    transform: translate(20px, 20px);
    transform: translate(20px, 20px);
  }
}

@keyframes animation2shape1 {
  from {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  to {
    transform: translate(20px, 20px);
    transform: translate(20px, 20px);
  }
}

.loading2 .shape2 {
  animation: animation2shape2 0.5s ease 0s infinite alternate;
  animation: animation2shape2 0.5s ease 0s infinite alternate;
}

@keyframes animation2shape2 {
  from {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  to {
    transform: translate(-20px, 20px);
    transform: translate(-20px, 20px);
  }
}

@keyframes animation2shape2 {
  from {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  to {
    transform: translate(-20px, 20px);
    transform: translate(-20px, 20px);
  }
}

.loading2 .shape3 {
  animation: animation2shape3 0.5s ease 0s infinite alternate;
  animation: animation2shape3 0.5s ease 0s infinite alternate;
}

@keyframes animation2shape3 {
  from {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  to {
    transform: translate(20px, -20px);
    transform: translate(20px, -20px);
  }
}

@keyframes animation2shape3 {
  from {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  to {
    transform: translate(20px, -20px);
    transform: translate(20px, -20px);
  }
}

.loading2 .shape4 {
  animation: animation2shape4 0.5s ease 0s infinite alternate;
  animation: animation2shape4 0.5s ease 0s infinite alternate;
}

@keyframes animation2shape4 {
  from {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  to {
    transform: translate(-20px, -20px);
    transform: translate(-20px, -20px);
  }
}

@keyframes animation2shape4 {
  from {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  to {
    transform: translate(-20px, -20px);
    transform: translate(-20px, -20px);
  }
}
</style>
