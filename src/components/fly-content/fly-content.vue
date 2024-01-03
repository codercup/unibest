<template>
  <view class="fly-content">
    <view v-for="n in line" :key="n" class="h-10 leading-10 text-center">
      很多内容，这里是第{{ n }}行
    </view>
  </view>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ line?: number }>(), { line: 10 })
</script>
