<route lang="json5">
{
  layout: 'demo',
  style: { navigationBarTitleText: 'UniUI Icons 使用' },
}
</route>

<template>
  <view class="m-4">
    <uni-icons type="contact" size="30"></uni-icons>
    <uni-icons type="contact" size="30" color="red"></uni-icons>
    <uni-icons type="contact" size="30" class="text-green"></uni-icons>
    <uni-icons type="contact" size="30" color="red" class="text-green"></uni-icons>
    <uni-icons type="contact" size="30" color="red" class="text-green"></uni-icons>
    <uni-icons type="contact" color="red" class="text-green w-4"></uni-icons>
    <uni-icons type="contact" color="red" class="text-green w-8"></uni-icons>
    <uni-icons :type="iconName" :color="colorName" class="text-green w-8"></uni-icons>
  </view>
</template>
<script lang="ts" setup>
const iconName = ref<string>('contact')
const colorName = ref<string>('red')
onLoad(() => {
  setTimeout(() => {
    iconName.value = 'chat'
    colorName.value = 'green'
  }, 1000)
})
</script>
