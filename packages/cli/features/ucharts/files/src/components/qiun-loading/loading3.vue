<template>
  <view class="container loading3">
    <view class="shape shape1"></view>
    <view class="shape shape2"></view>
    <view class="shape shape3"></view>
    <view class="shape shape4"></view>
  </view>
</template>

<script>
export default {
  name: 'loading3',
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

.container.loading3 {
  animation: rotation 1s infinite;
  animation: rotation 1s infinite;
}

.container.loading3 .shape1 {
  border-top-left-radius: 10px;
}

.container.loading3 .shape2 {
  border-top-right-radius: 10px;
}

.container.loading3 .shape3 {
  border-bottom-left-radius: 10px;
}

.container.loading3 .shape4 {
  border-bottom-right-radius: 10px;
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

.loading3 .shape1 {
  animation: animation3shape1 0.5s ease 0s infinite alternate;
  animation: animation3shape1 0.5s ease 0s infinite alternate;
}

@keyframes animation3shape1 {
  from {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  to {
    transform: translate(5px, 5px);
    transform: translate(5px, 5px);
  }
}

@keyframes animation3shape1 {
  from {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  to {
    transform: translate(5px, 5px);
    transform: translate(5px, 5px);
  }
}

.loading3 .shape2 {
  animation: animation3shape2 0.5s ease 0s infinite alternate;
  animation: animation3shape2 0.5s ease 0s infinite alternate;
}

@keyframes animation3shape2 {
  from {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  to {
    transform: translate(-5px, 5px);
    transform: translate(-5px, 5px);
  }
}

@keyframes animation3shape2 {
  from {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  to {
    transform: translate(-5px, 5px);
    transform: translate(-5px, 5px);
  }
}

.loading3 .shape3 {
  animation: animation3shape3 0.5s ease 0s infinite alternate;
  animation: animation3shape3 0.5s ease 0s infinite alternate;
}

@keyframes animation3shape3 {
  from {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  to {
    transform: translate(5px, -5px);
    transform: translate(5px, -5px);
  }
}

@keyframes animation3shape3 {
  from {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  to {
    transform: translate(5px, -5px);
    transform: translate(5px, -5px);
  }
}

.loading3 .shape4 {
  animation: animation3shape4 0.5s ease 0s infinite alternate;
  animation: animation3shape4 0.5s ease 0s infinite alternate;
}

@keyframes animation3shape4 {
  from {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  to {
    transform: translate(-5px, -5px);
    transform: translate(-5px, -5px);
  }
}

@keyframes animation3shape4 {
  from {
    transform: translate(0, 0);
    transform: translate(0, 0);
  }

  to {
    transform: translate(-5px, -5px);
    transform: translate(-5px, -5px);
  }
}
</style>
